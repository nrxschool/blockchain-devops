# Aula 6.2: Padrão ERC20

## Introdução

Bem-vindos à nossa aula sobre o **Padrão ERC-20**, um dos pilares fundamentais do ecossistema Ethereum. O ERC-20 define um conjunto de regras que um token na blockchain Ethereum deve seguir para ser compatível com outros contratos e serviços dentro da rede.

Nesta aula, vamos entender o que são **Ethereum Improvement Proposals (EIPs)**, focar na implementação de um **token ERC-20** com uma vulnerabilidade intencional de controle de acesso (que corrigiremos mais tarde), e escrever testes automatizados para garantir que nosso contrato esteja funcionando corretamente. No final da aula, faremos o deploy local desse token, configuraremos o Metamask para interagir com ele, e realizaremos transferências.

## O que são EIPs

Os **Ethereum Improvement Proposals (EIPs)** são documentos que especificam novos recursos ou processos para a Ethereum. Eles são utilizados para sugerir mudanças técnicas no protocolo, melhorias na rede ou introduzir novos padrões para contratos e tokens.

- [eips.ethereum](https://eips.ethereum.org)

Um dos EIPs mais famosos é o **EIP-20**, que define o padrão de tokens **ERC-20**. Esse padrão garante que todos os tokens ERC-20 tenham um conjunto básico de funções e eventos, como `transfer`, `approve`, `transferFrom` e `totalSupply`, permitindo que esses tokens sejam facilmente integrados a carteiras, exchanges e outros contratos inteligentes.

- [erc20](https://eips.ethereum.org/EIPS/eip-20)

**ERC-20**: O ERC-20 é o padrão mais utilizado para tokens fungíveis. Esses tokens são intercambiáveis (um token é igual ao outro) e podem representar qualquer ativo digital, como moedas, pontos de recompensa ou ações.

---

## Implementando um ERC-20

- `IERC20.sol`: Interface com funções
- `ERC20.sol`: Implementação da interface
- `Token.sol`: Criação do token

---

## Escrevendo testes automatizados para ERC-20

- Teste para validar transaferencias

---

## Explorando a vulnerabilidade de Access Control

- Criar contrato de ataque
- Escrever teste para validar `mint` por alguém não autorizado

---

## Deploy local, Configuração Metamask e Transferências

1. **Deploy local**:

2. **Configurando o Metamask**:

3. **Realizando transferências**:

---

## Recapitulação

Nesta aula, exploramos:

- O que são **EIPs** e como o **EIP-20** define o padrão ERC-20 para tokens fungíveis.
- Implementamos um **contrato ERC-20 básico** com uma função `mint` vulnerável a ataques de controle de acesso.
- Escrevemos **testes automatizados** para garantir o funcionamento correto do token e detectamos a vulnerabilidade.
- Corrigimos a vulnerabilidade introduzindo um controle de acesso adequado.
- Fizemos o **deploy do contrato** localmente e configuramos o **Metamask** para interagir com o token.

---

## Conclusão

O **padrão ERC-20** é amplamente utilizado e tem uma grande importância no ecossistema Ethereum. Compreender sua implementação e os possíveis pontos de vulnerabilidade é essencial para garantir que seus tokens funcionem de forma segura e eficiente. Os tokens ERC-20 estão no coração de muitos projetos DeFi e são a base para muitos tokens no mercado hoje.

---

## Lição de casa

1. **Implementar outros tokens ERC-20**: Crie e faça deploy de outros tokens e adicione na sua metamask.
2. **Escrever testes automatizados**: Escreva um teste para validar o funcionamento do `approve` e `transferFrom`.
3. **Corrigir vulnerabilidade de Access Control**: Tente corrigir a vulnerabilidade da função `mint`.
4. **Deploy na testnet**: Faça deploy do seu token em uma **testnet pública** e publique no Linkeind.

---

## Próxima Aula

Na próxima aula, vamos continuar estudando sobre segurança, corrigir nossa vulnerabilidade e criar um novo contrato para entender como realizar e corrigir um ataque de `Reentrancia`.
