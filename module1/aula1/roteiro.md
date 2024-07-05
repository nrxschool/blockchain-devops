# Template de Estudo de Blockchains

## Introdução

Bem-vindos a mais uma aula sobre blockchain! Hoje, vamos dividir nossa explicação em dois níveis: low-level e high-level. Este template foi elaborado para fornecer uma base sólida que pode ser aplicada a qualquer tipo de blockchain. Vamos usar o Princípio de Pareto 80/20, levado ao extremo, onde 0.8% do conhecimento pode trazer mais de 50% dos resultados. Conhecendo o básico sobre wallets, transações, blocos, consenso e smartcontracts, você já terá uma compreensão robusta sobre qualquer projeto de blockchain e estará preparado para continuar seus estudos com confiança.

## Low-level

Vou explicar primeiro sobre o baixo nivel com um ponto de vista de sequencia. E depois vamos para alto nivel falando de forma global.

### Wallets

As wallets são essenciais no mundo das criptomoedas e blockchains. Elas são como carteiras digitais que armazenam suas chaves criptográficas e essas chaves que dão acesso aos seus ativos. Existem diferentes tipos de wallets: hardware wallets, software wallets, paper wallets. Vamos entender como funcionam. Primeiro, você cria uma Seed que é uma sequencia de 12 palavras aleatórias, como uma senha. Essa Seed é transformada em uma PrivateKey que é uma sequencia de 32 bytes. A partir dessa PrivateKey, calculamos matemáticamente por meio de uma curva eliptica a PublicKey que também é uma sequencia de 32 bytes. Finalmente, resumimos a PublicKey em um Address com um checksum, embora este passo seja opcional para algumas blockchain. [Mostrar imagem aqui]

### Transações (Tx)

Agora vamos falar sobre transações, ou simplesmente Tx. Transações são a espinha dorsal de qualquer blockchain. Elas representam a transferência de valor ou a execução de contratos. Componentes de uma transação do tipo Account-based (que o caso do Ethereum) são: from, to, amount, fee e a signature. Como funcionam as transações? Primeiro, adicionamos a PublicKey ou Address do destinatário que é o `to`, que também pode ser um smartcontract. Depois, adicionamos a quantidade de token ou a chamada do smartcontract já serializada. A transação é então serializada e assinada antes de ser enviada para um Node. [Mostrar imagem aqui] Mas como elas são adicionadas na blockchain?

### Blocos

Em conjuntos sequenciais que são chamados de blocos.

Ou seja um Bloco é um agrupamento de transações com metadados. Cada bloco possui um cabeçalho e um corpo onde estão as transações. Esses blocos são criados da seguinte forma: Primeiro, recebemos e validamos as transações. Em seguida, adicionamos elas no Mempool. Por fim, agregamos essas transações em um bloco. [Mostrar imagem aqui] Mas ainda não persistimos ele.

### Consenso

Pra isso todos os node da rede precisam entrar em consenso sobre qual bloco será persistido na cadeia de blocos, na blockchain. Existem diferentes mecanismos de consenso, como Proof of Work, Proof of Stake e etc.
Pra isso é preciso um processo chamado mineração que vária de acordo com cada mecanismo de consenso. Caso um node receba um bloco durante a mineração, ele valida o bloco e ser for um bloco já minerado ele é adiciono à cadeia a blockchain. [Mostrar imagem aqui]

### Smartcontracts

Um smartcontract é trecho de código que contém apenas a lógica de negócios e é agnostico quanto a todo o resto. A linguagem desse código depende da plataforma, EVM (Ethereum) usa Solidity outras blockchain chamadas no-EVM usam alguma linguagem que compilam para WebAssembly como Rust, AssemblyScript, Golang ou C. Pra isso:

Primeiro, desenvolvemos o smartcontract, compilamos e serializamos. Em seguida, montamos uma transação com o bytecode e a assinamos antes de enviá-la.

Para interagir com um smartcontract, montamos a chamada usando uma interface para as funções do contrato, que é comumente chamada de ABI. Se for uma operação de escrita, assinamos e enviamos a transação. Para operações de leitura, fazemos uma simples requisição. [Mostrar imagem aqui]

## High-level

Agora vamos ver como comparar projetos de blockchain com sistemas mais comuns de we2.

### Comparação com CRUD

Vamos fazer uma comparação entre blockchains e sistemas CRUD tradicionais olhando para Banco de Dados, Autenticação, Rede, Versionamento e Servelees.

### Comparação sobre Banco de dados

Primeiro, vamos falar sobre banco de dados.

1. Em um banco de dados tradicional, o bancos gerealmente é um servidor e é gerenciado como outra aplicação ou serviço como MongoDB, MySQL ou PostGree. Já em Blockchain usamos banco embarcados de alta performance como o LevelDB ou o mais atual RocksDB.

2. Além disso em Blockchain não temos a operação de Delete, podemos atualizar os dados e criar novos, mas o registro deve ser sempre imutavel no sentido de deleções.

3. Enquanto um CRUD geralmente usa uma estrutura relacional, na blockchain trabalhamos com uma estrutura semelhante a uma lista encadeada onde cada dados persistido está ligado a outro.

4. Falando em persistência, ela é feita em lotes, conhecidos como blocos. Cada operação é chamada de transação e o bloco serve pra agrupar e persistir essas operações. [Mostrar imagem aqui]

### Comparação sobre autenticação

A autenticação em sistemas tradicionais usa email e senha, frequentemente combinados com tokens. No blockchain, utilizamos chaves privadas e públicas, juntamente com assinaturas, para garantir a segurança e a integridade. [Mostrar imagem aqui]

### Comparação sobre rede

Na rede, sistemas tradicionais usam redundância e balanceadores de carga. Em blockchains, a sincronização dos nodes é fundamental para a manutenção do consenso e da integridade da rede. [Mostrar imagem aqui]

### Comparação sobre Versionamento

O versionamento em sistemas tradicionais é gerenciado por CI/CD, enquanto no blockchain temos o deploy descentralizado e a utilização de smartcontracts, que podem ser atualizados e versionados de maneira transparente e segura. [Mostrar imagem aqui]

### Comparação sobre serveless

Por fim, no contexto de serveless, sistemas tradicionais utilizam roteamento, enquanto blockchains usam endereços e calldata. A centralização dos serviços é substituída pela descentralização da rede blockchain. [Mostrar imagem aqui]

## Resumo da Aula

Recapitulando, abordamos conceitos de low-level, como wallets, transações, blocos, consenso e smartcontracts, e conceitos de high-level, comparando blockchains com sistemas CRUD tradicionais.

## Próxima aula: Noções Históricas

Na próxima aula, vamos explorar as noções históricas e entender a evolução da tecnologia blockchain.
"""
