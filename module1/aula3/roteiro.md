# AULA 3: Análise Hyperledger Besu

## Introdução

Bem-vindos à nossa aula sobre Hyperledger! Hoje vamos explorar o que é a Hyperledger, a arquitetura do Hyperledger Besu e seus conceitos fundamentais como Wallet, Transação, Bloco, Consenso e Smart Contracts. Além disso, vamos aprender sobre a wallet Metamask, como instalá-la e configurá-la no seu navegador, pois ela será muito útil nas nossas atividades.

## O que é a Hyperledger?

Hyperledger é uma fundação e, parafraseando o que está no site: "É um ecossistema aberto e global para tecnologias de blockchain de nível corporativo. Como um projeto da Linux Foundation, a Hyperledger Foundation coordena uma comunidade de organizações, membros e não membros, contribuintes individuais e programadores que criam plataformas, bibliotecas, ferramentas e soluções de nível corporativo para sistemas que utilizam tecnologias de registro distribuído (DLT) como blockchain e outras tecnologias relacionadas."

Alguns dos projetos incubados por eles são:

- Hyperledger Fabric para redes permissionadas
- Hyperledger Besu, que é compatível com a rede Ethereum e é o case do DREX
- Hyperledger Indy focado em Identidade Digital Descentralizada

Entre outros...

## Arquitetura do Hyperledger Besu

Hyperledger Besu é um cliente Ethereum criado para ambientes corporativos e suporta redes permissionadas, privadas e públicas. Vou explicar a diferença entre cada uma:

- Pública: Todos podem se conectar, basta ter internet e conhecer o endereço de algum dos nodes, o Bitcoin e Ethereum são exemplos disso.
- Privada: Apenas agentes com acesso podem conectar e visualizar a rede, como um bitcoin que roda dentro de uma empresa e apenas funcionários com acesso podem se conectar.
- Permisionada: É uma rede privada entre empresas onde apenas alguns participantes podem atuar como validadores.

Vamos voltar a falar sobre os recursos do Besu:

- Ele suporta Ethereum Virtual Machine (EVM)
- Também suporta múltiplos algoritmos de consenso: PoA, PoW, PoS
- Fornece APIs: JSON-RPC, GraphQL, Websocket e IPC
- Perimite monitoramento de métricas com Prometheus e Grafana, e explorador de blocos como Blockscout e outros
- Privacidade e criação de redes permissionadas como o DREX.

## Indo mais a fundo.

O Besu compartilha a maioria das tecnologias do Ethereum. Vamos relembrar elas aqui:

- **Wallet e Criptografia:**

  - Funções de Hash: SHA-3 (keccak256)
  - Curvas elípticas: secp256k1 (Ethereum default) e secp256r1

- **Transações:**

  - Padrões de tx: Taxas dinâmicas com EIP1559 e blob transactions EIP4844
  - Tamanho máximo: Baseado no gas (default 21.000) porém configurável

- **Bloco:**

  - Tamanho do bloco: Baseado no gas (default 30.000.000) porém configurável
  - Tempo de bloco: default 15 segundos porém configurável

- **Consenso:**

  - Proof of Work (PoW): Ethash para redes públicas
  - Proof of Authority (PoA): QBFT, Clique e IBFT 2.0, para redes permissionadas e/ou privadas
  - Proof of Stake (PoS): Para compatibilidade com o Ethereum 2.0

- **Smart Contracts:**
  - Versões de EVM: Shangai

## O que é Metamask?

Agora que já temos uma base sobre como uma wallet funciona, vamos instalar a wallet mais usada no ecosistema web3 e Ethereum, a metamask.

Metamask é uma wallet do tipo extensão de navegador que funciona como uma carteira digital para Ethereum e outras redes EVM compatíveis em vários navegadores como Chrome, Firefox ou Brave. Ela permite a interação fácil com o redes EVM e seus dApps (aplicações descentralizadas). Com Metamask, você pode gerenciar chaves, contas, enviar e receber transações, e conectar-se a diversas dApps.

## Arquitetura Metamask

Mas antes de instalar e configurar nossa metamask vamos entender como ela interage com a blockchain e os Dapps. Podemos dividir a Metamask em duas partes:

- Client: É o objeto Javascript injetado (`window.ethereum`) na página do seu Dapp pela extensão da MetaMask. Isso permite que o frontend do DApp interaja com a MetaMask, solicitando a conexão com a carteira e enviando transações.

- Metamask: É onde a mágica acontece. A MetaMask armazena as chaves privadas dos usuários de forma segura localmente no dispositivo. As chaves nunca são expostas ao DApp, garantindo a segurança dos fundos dos usuários. Quando um DApp solicita uma transação, a MetaMask exibe um prompt para o usuário revisar e aprovar a transação. Após a aprovação, a transação é assinada localmente e enviada à blockchain através de um nó Ethereum. A MetaMask se conecta a um nó Ethereum através de RPC (Remote Procedure Call) para enviar transações e consultar dados da blockchain.

O processo de interação entre uma wallet, frontend e blockchain acontece da seguinte forma:

1. O usuário clica no frontend para conectar sua wallet ao dapp.
2. O frontend utiliza o cliente (extensão MetaMask instalada no navegador) disponível em `window.ethereum`.
3. O frontend faz uma chamada via RPC solicitando um ou mais endereços disponíveis na wallet com:

```js
window.ethereum.request({ method: "eth_requestAccounts" });
```

4. Quando a wallet fornece seus endereços, o Dapp "se conecta com a wallet", permitindo que o Dapp solicite que o endereço assine e envie transações para a blockchain.
5. Depois disso, todas as chamadas para smart contracts são enviadas para a wallet como uma transação crua.
6. A wallet pergunta ao usuário se ele deseja assinar e enviar aquela transação para a blockchain com:

```js
let transactionObject = {
  to: "0xRecipientAddress",
  value: "0x29a2241af62c0000", // valor em wei
  gas: "0x5208", // limite de gás
  gasPrice: "0x09184e72a000", // preço do gás
  data: "0x", // dados adicionais, se houver
};

let signTx = await window.ethereum.request({
  method: "eth_sendTransaction",
  params: [transactionObject],
});
await window.ethereum.request({
  method: "eth_sendRawTransaction",
  params: [signTx.raw],
});
```

## Instalação e configuração da metamask

Para instalar basta acessar https://metamask.com e baixar a extensão especifica para seu navegador.
A configuração é algo específico por pra facilitar teu entendimento vou dividir assim:

- Redes
- Chaves privadas
- Trobleshooting

### Chaves privadas

Após instalar a metamask precisamos inserir um seed ou criar uma nova. Para desenvolvimento a seed padrão é `test test test test test test test test test test test junk`. NUNCA USE ESSA SEED PARA CASOS REAIS. Após adicinar essas seed o nosso endereço deve ser: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`.

A Metamask permite `Derivation path` para wallets, ou seja, usando uma mesma seed podemos gerar multiplos endereços com a mesma seed. Para isso basta adicionar uma nova `Account`. Também podemos adicionar uma nova chave privada, usando a função `import private key`. Por exemplo se você usar a seguinte chave privade: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d` deve gerar esse endereço: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`.

### Redes

Metamask é bem flexivel em relação as redes, permintindo que você se conecte básicamente com qualquer EVM.
Pra isso basta ir em configurações e adicionar uma nova rede e selecionar.

Sobre a rede local que usaremos nos próximos módulos, é preciso usa `localhost:8545` ou `127.0.0.1:8545`. A porta `8545` é a porta padrão para o JSON-RPC e a `8546` a porta padrão para o socket.

### Trobleshooting - nonce de transações

Esse é um problema muito comum quando estamos desenvolvendo smartcontracts. O que acontece é o seguinte, para blockchains EVM, cada conta que interage com a blockchain enviando transações recebe um contador de transações chamado de nonce. Isso é feito para que se possa escolher a ordem das transações enviadas, podemos enviar 100 transações e com o nonce podemos garantir a ordem de execução delas.

Porém algumas vezes pode acontecer de nossa wallet (metamask) perder a sincronização desse contador. Nesse caso o comportamento é o seguinte:

1. Enviamos uma transação com o nonce 1.
2. Porém na blockchain o nonce para nossa wallet está em 15.
3. Vamos ter um erro de nonce.

A forma de resolver isso é simples, `configurações > avançados > remover todos os dados` assim nossa wallet vai apagar o nonce salvo e vai sincronizar com a rede que estamos conectados.

Mas por qual motivo isso acorre? Vamos supor a seguinte situação:

1. Você roda uma blockchain local.
2. Você faz o deploy de alguns smartcontracts e interage com eles.
3. Vamos supor que foram feitas 15 transações
4. Então nesse ponto a blockchain e a wallet estão com um `nonce` sincronizado em 15
5. Se você derrubar a blockchain a wallet continuará com o `nonce` 15 salvo.
6. Quando você rodar a blockchain novamente ela irá reiniciar tudo inclusive o `nonce` (ou não depende de como vc configurou)
7. No momento que você enviar a próxima transação obterá o erro pois não está sincronizado.

## Conclusão

Agora que temos nossa wallet instalada e configura vamos recapitular o que aprendemos. Nessa aula você aprendeu:

- O que é o Hyperledger.
- O que é o Hyperledger Besu e sua arquitetura.
- Quais recursos o Besu possui.
- Diferença entre blockahin públicas, privadas e permissionadas.
- O que é a Metamask e sua arquitetura.
- Interação entre wallet, frontend e blockcahin

## Tarefa de casa:

- Instalar e configura a metamask no seu navegador favorito.
- Adiciona a seed para gerar o seguinte enderenço: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`.
- Importar uma chave privada para gerar o seguinte enderenço: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`.
