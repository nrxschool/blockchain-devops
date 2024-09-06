# Aula 6.1: Introdução ao Desenvolvimento de Smartcontracts EVM

## Introdução

Bem-vindos à nossa aula sobre o desenvolvimento de smartcontracts na Ethereum Virtual Machine, ou simplesmente EVM.

A EVM é o núcleo do Ethereum e de muitas outras blockchains compatíveis, como a Binance Smart Chain e a Avalanche. Ao longo desta aula, vamos entender o que é a EVM, sua arquitetura e como ela executa smartcontracts.

Além disso, vamos configurar um ambiente de desenvolvimento completo utilizando ferramentas modernas como Foundry e ScaffoldETH2, para que você possa começar a construir seus próprios contratos inteligentes de forma eficiente.

## Tooling de Ferramentas EVM

Antes de mergulharmos na configuração do ambiente, é importante conhecer as ferramentas disponíveis no ecossistema EVM. Cada uma delas tem um papel crucial no desenvolvimento de smartcontracts. Vamos explorar as principais opções:

- **Truffle / Ganache:** Truffle é um dos frameworks mais antigos para desenvolvimento de smartcontracts. Ele oferece uma suíte completa de ferramentas, incluindo um ambiente de testes, scripts de deploy e integração com o Ganache, um blockchain local que simula a rede Ethereum para testes.

- **Etherjs / Web3js:** Essas bibliotecas JavaScript são fundamentais para interagir com a blockchain Ethereum. Enquanto o Etherjs se destaca pela simplicidade e modularidade, o Web3js oferece uma interface robusta e completa para desenvolvedores que buscam maior controle sobre as interações com contratos e transações.

- **Hardhat / Brownie / ApeWorkx:** Hardhat é um ambiente de desenvolvimento popular que facilita o teste, deploy e depuração de contratos inteligentes. Brownie, por outro lado, é uma ferramenta poderosa para desenvolvedores Python, oferecendo integração com contratos Solidity. ApeWorkx é uma ferramenta mais recente, focada em modularidade e flexibilidade, ideal para desenvolvedores que buscam customização no fluxo de trabalho.

- **Foundry / Viem / Slither:** Foundry é uma ferramenta emergente que oferece uma experiência rápida e eficiente para desenvolvimento e testes de contratos. Viem é uma biblioteca TypeScript moderna para interagir com EVMs, focada em segurança e performance. Slither é uma ferramenta de análise estática que ajuda a identificar vulnerabilidades em contratos Solidity, essencial para garantir a segurança do seu código.

Agora que conhecemos as ferramentas, vamos colocá-las em prática.

## Setup dev tools

Vamos começar configurando nosso ambiente de desenvolvimento. O primeiro passo é instalar um template Fullstack Web3, que serve como base para nosso projeto.

### 1. Instalação do Fullstack Template Web3

O Fullstack Template Web3 é um projeto whitelabel para facilitar desenvimento de um Dapp.

Ele tem:

- Configuração rápida para testar o projeto pre-produção
- Debug via frontend
- Exemplos de comunicação front-smartcontracts

**Para instalar**

```bash
git clone https://github.com/olivmath/fwt
```

### 2. Tour pelo Template

O template já vem com um novo projeto chamado Counter pronto pra execução. Para rodar o projeto você precisa intalar as dependencias que estão no `README.md`

Depois disso, vamos buildar e rodar os testes.

```bash
cd ftw/smartcontract
forge build
forge teste
```

Agora para fazer o deploy podemos fazer de 2 formas, na mão ou via docker.

Um passo atrás aqui. Pra fazer um deploy de smartcontract precisamos de uma blockchain rodando. E para interagir e debugar nossos contratos precisamos de um frontend que é o template.

#### 2.1 Deploy na mão

1. Como sempre pra rodar nossa infra via docker compose
2. Para rodar o frontend, precisamos instalar ele
3. Na pasta `ui` você instalar as dependencias com `npm i` ou `yarn` ou `pnpm i`.
4. Agora vamos rodar o projeto com `npm run dev` ou `yarn dev` ou `pnpm dev`
5. Agora voltamos para a pasta dos smartcontracts e rodamos o script `deploy.local.sh`

#### 2.2 Deploy via Docker

1. Simplesmente rode o docker compose da raiz do projeto

### 3. Interagindo com contrato

Por fim, vamos aprender a interagir com o smartcontract via o frontend.

Tour pelo frontend...

## Ciclo de desenvolvimento de contratos

O processo é o mais importante quando estamos desenvolvendo software.

1. Entender a regras de negócio
2. Desenvolver o contrato
3. Testar
4. Auditar
5. Deploy local
6. Debug via front
7. Deploy Testnet
8. Debug via front
9. Deploy Maintnet
