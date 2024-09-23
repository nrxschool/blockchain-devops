# Aula 6.1: Introdução ao Desenvolvimento de Smartcontracts EVM

## Introdução

Bem-vindos à nossa aula sobre o desenvolvimento de smartcontracts na Ethereum Virtual Machine, ou simplesmente EVM.

A EVM é o núcleo do Ethereum e de muitas outras blockchains compatíveis, como a Binance Smart Chain e a Avalanche. Ao longo desta aula, vamos entender o que é a EVM, sua arquitetura e como ela executa smartcontracts.

Além disso, vamos percorrer brevemente a história das ferramentas de desenvolvimento de smartcontracts e configurar um ambiente de desenvolvimento completo utilizando ferramentas modernas como Foundry e ScaffoldETH2. O objetivo é que você possa começar a construir seus próprios contratos inteligentes de forma eficiente e segura.

## O que é EVM

A Ethereum Virtual Machine (EVM) é uma máquina virtual descentralizada que permite a execução de código de contratos inteligentes. Funciona como um ambiente de tempo de execução para contratos inteligentes escritos principalmente em Solidity, mas também suporta outras linguagens de programação.

A EVM garante que, quando um contrato é executado, ele funcione da mesma forma em todas as máquinas da rede Ethereum, independentemente de onde o nó esteja localizado. É o componente responsável por manter a integridade do código executado na blockchain e assegurar que todos os participantes da rede possam confiar na execução exata dos contratos inteligentes.

### Arquitetura da EVM

A Ethereum Virtual Machine (EVM) é uma máquina virtual baseada em pilha (stack-based machine), ou seja, ela utiliza uma **pilha de execução** para processar operações. Ao contrário de máquinas com registradores, que podem armazenar múltiplas variáveis diretamente, na EVM, todos os dados temporários passam pela pilha. Sua arquitetura pode ser dividida nos seguintes componentes principais:

#### 1. **Stack (Pilha)**

- **Função**: A pilha é usada para armazenar variáveis temporárias e realizar operações durante a execução de contratos. Todos os cálculos intermediários e dados de curta duração são manipulados na pilha.
- **Características**:
  - A pilha da EVM é uma estrutura LIFO (Last In, First Out), o que significa que o último valor colocado nela será o primeiro a ser retirado.
  - Ela tem um limite fixo de 1024 elementos, e cada elemento ocupa 256 bits.
  - A pilha é usada para operações como adicionar, subtrair, multiplicar, comparar valores, chamar funções, e empilhar resultados intermediários.

#### 2. **Memory (Memória)**

- **Função**: A memória é um espaço temporário e volátil utilizado durante a execução de um contrato inteligente. É usada para armazenar dados de maneira mais extensa do que a pilha, mas não é persistente.
- **Características**:
  - A memória é inicializada vazia e seus valores são apagados quando a execução do contrato termina.
  - É usada para armazenar dados temporários que são maiores ou mais complexos do que os dados que cabem na pilha.
  - A memória é acessada principalmente através de operações de leitura e escrita em arrays ou structs temporários.
  - O custo de gas da memória aumenta linearmente com o uso, de acordo com o tamanho da alocação.

#### 3. **Storage (Armazenamento)**

- **Função**: O armazenamento é a área onde os dados permanentes de um contrato inteligente são mantidos. Isso inclui variáveis de estado, como saldos, permissões e outras informações persistentes.
- **Características**:
  - O storage é muito mais caro em termos de gas comparado à memória, porque é uma estrutura permanente, escrita e armazenada no blockchain.
  - O armazenamento só é modificado quando variáveis de estado são atualizadas ou criadas.
  - Cada posição de armazenamento tem um custo elevado de leitura e escrita, e a otimização do uso de storage é fundamental para contratos eficientes.
  - O armazenamento persiste entre diferentes execuções de transações no mesmo contrato, permitindo que os contratos guardem informações ao longo do tempo.

#### 4. **Calldata**

- **Função**: O calldata é uma área de memória somente leitura usada para armazenar os dados de entrada de funções externas em um contrato inteligente. Ele contém os argumentos passados para a função.
- **Características**:
  - O calldata é imutável, ou seja, uma vez que os dados são fornecidos a uma função, eles não podem ser modificados durante a execução.
  - Ao contrário da memória e do storage, o calldata é mais eficiente em termos de gas, pois é usado para dados temporários e de passagem.
  - Calldata é ideal para receber parâmetros de entrada sem a necessidade de alocação de memória adicional. Um uso típico do calldata é em funções `external`, que utilizam diretamente os dados de entrada.
  - Quando uma função `external` é chamada, o calldata armazena o endereço do contrato, o seletor da função, e os argumentos passados, e esses dados podem ser lidos diretamente.

#### 5. **Gas**

- **Função**: O gas é uma unidade de medida que limita a quantidade de trabalho computacional que uma transação ou contrato pode realizar. Ele também serve para compensar os mineradores pela execução dos contratos e impedir loops infinitos.
- **Características**:
  - Cada operação na EVM tem um custo de gas associado. Operações mais intensivas, como escrita em storage, consomem mais gas.
  - O gas é necessário para assegurar que os contratos sejam executados de forma eficiente e para evitar ataques de negação de serviço (DoS), onde uma transação poderia travar a rede ao consumir poder computacional excessivo.

### Básico sobre smartcontracts

Smartcontracts, ou contratos inteligentes, são programas que executam automaticamente ações quando determinadas condições são atendidas. Eles são gravados em código e implantados na blockchain, onde funcionam de forma autônoma e imutável. No contexto da EVM, os smartcontracts são principalmente escritos em Solidity, uma linguagem inspirada em JavaScript e C++.

Um contrato inteligente pode ser programado para gerenciar ativos digitais, criar regras de governança, realizar negociações automatizadas, entre outros usos. O código de um smartcontract, uma vez implantado na blockchain, não pode ser alterado, o que torna essencial que o desenvolvimento seja bem planejado e auditado.

---

## Tooling de Ferramentas EVM

Ferramentas de desenvolvimento para a EVM evoluíram bastante nos últimos anos. Vamos ver duas abordagens comuns: Truffle/Hardhat, que foram as ferramentas pioneiras no ecossistema Ethereum, e o emergente Foundry, que está ganhando popularidade por sua simplicidade e desempenho.

### Truffle e Hardhat

- **Truffle**: É uma das ferramentas mais antigas e amplamente usadas para desenvolvimento de contratos inteligentes. Ele fornece um ambiente de desenvolvimento completo, com gerenciamento de projetos, compilação de contratos e testes.
- **Hardhat**: Mais recente que o Truffle, o Hardhat tornou-se popular pela sua flexibilidade e melhor integração com ferramentas de depuração e teste. Ele permite um controle mais refinado do ambiente de desenvolvimento e oferece recursos como o Hardhat Network, uma blockchain local que permite testes rápidos.

### Brownie e ApeWorkx

- **Bronie**: É uma ferramenta de desenvolvimento que facilita a criação e gerenciamento de contratos inteligentes, focando em simplicidade e usabilidade. Bronie se destaca por sua interface amigável e por permitir que desenvolvedores menos experientes naveguem facilmente pelo processo de construção de DApps. Além disso, oferece recursos integrados para testes automatizados e integração com serviços de armazenamento descentralizado.
- **ApeWorkx**: Parte do ecossistema Ape, é uma coleção de ferramentas projetadas para facilitar o desenvolvimento em Solidity. ApeWorkx inclui uma série de utilidades para otimização de contratos e ferramentas de análise, permitindo que os desenvolvedores implementem e testem seus contratos com eficiência. A plataforma também oferece suporte para integração com wallets e ferramentas de monitoramento de eventos.

Ambas as ferramentas têm integração com bibliotecas populares como OpenZeppelin e suporte para deploy em várias blockchains compatíveis com a EVM.

### Ecosistema Foundry

Foundry é uma nova suíte de ferramentas para desenvolvimento de contratos inteligentes que oferece uma experiência mais leve e eficiente. Ele foi projetado para ser rápido e fácil de usar, com foco em uma integração contínua e testes eficientes.

- **Forge**: A ferramenta principal para compilação e teste de contratos. É extremamente rápida em comparação com outras soluções.
- **Anvil**: Um servidor de desenvolvimento que simula uma blockchain local altamente configurável e facilita a simulação de diferentes cenários de rede, como ataques ou falhas.
- **Cast**: Utilizada para interagir diretamente com contratos, realizar chamadas de leitura, escrita e outras operações na blockchain.
- **Chisel**: REPL de solidity rápido e útil.

---

Aqui está a conclusão do tópico com o SDLC (Security Development Life-Cycle):

## Ciclo de desenvolvimento de contratos

Ao desenvolver contratos inteligentes, é importante adotar boas práticas que minimizam erros e maximizam a segurança. Vamos discutir três princípios-chave para garantir um desenvolvimento mais seguro e eficiente.

### Shift Left

O conceito de "Shift Left" no desenvolvimento de software significa mover as atividades de teste e verificação de segurança o mais cedo possível no ciclo de desenvolvimento. Para contratos inteligentes, isso significa escrever testes desde o início, garantir que cada função seja testada antes de ser integrada, e implementar auditorias contínuas durante o desenvolvimento, em vez de esperar até o final.

### Auditoria

Auditar contratos inteligentes é um passo crucial. Diferente de outros tipos de software, contratos na blockchain são imutáveis após o deployment. Portanto, erros podem ser catastróficos. Utilizar ferramentas de análise estática, testes automatizados e passar por auditorias externas, especialmente antes de um lançamento público, são práticas recomendadas.

### Testnet First

Antes de implantar um contrato na rede principal, ele deve ser testado exaustivamente em uma testnet. Testnets como Ropsten, Goerli ou Sepolia oferecem uma réplica do ambiente de produção, mas com ativos simulados, permitindo testes sem risco financeiro. Certifique-se de que todas as funcionalidades estejam funcionando conforme o esperado na testnet antes de seguir para a mainnet.

## SDLC (Security Development Life-Cycle)

O SDLC (Security Development Life-Cycle) é um modelo que integra práticas de segurança em todas as etapas do ciclo de desenvolvimento de software, desde o planejamento até a manutenção. Para contratos inteligentes, adotar o SDLC é crucial para mitigar riscos e garantir a integridade dos contratos. As fases principais do SDLC incluem:

1. dev: Fase de desenvolvimento do contrato, deve ser feito usando TDD/BDD.
2. test: Auditória simples via analizador estático de código.
3. local: Deploy local para testar integração via Frontend.
4. audit: Auditoria nos contratos
5. fix: Correção das vulnerabilidades encontradas
6. testnet: Deploy na testnet para teste com usuários reais
7. mainnet: Deploy na mainnet para uso real

---

## Setup e Tour pelo Template

Agora que entendemos as ferramentas disponíveis, vamos configurar o ambiente de desenvolvimento.

Pra isso vamos usar um fork do **ScaffoldETH2** que eu integrei com o Foundry. Esse template combina várias ferramentas e oferece exemplos de integração com as bibliotecas web3 e uma interface dinâmica para testar e interagir com o contrato.

1. **Instalar o template**

```bash
git clone https://github.com/olivmath/fwt
```

2. **Instalar as dependencias**

```bash
cd fwt/ui
npm install # ou yarn ou pnpm install
```

3. **Levantar o ambiente**

Você vai precisar de 3 terminais:

- **Blockchain**

```bash
anvil -b 2 # minerar blocos a cada 2 segundos
```

- **Deploy dos contratos**

```bash
cd smartcontracts
./deploy-on-local.sh
```

---

## Recapitulação

Nesta aula, abordamos a base do desenvolvimento de smartcontracts na Ethereum Virtual Machine (EVM). Discutimos:

- O que é a EVM e como ela funciona;
- A arquitetura interna da EVM, incluindo Stack, Memory, Storage e Gas;
- O básico sobre smartcontracts e sua execução na blockchain;
- As principais ferramentas para desenvolvimento de contratos, como Truffle, Hardhat e Foundry;
- O setup de um ambiente de desenvolvimento eficiente usando ScaffoldETH2;
- Práticas recomendadas para um ciclo de desenvolvimento seguro e eficiente, como Shift Left, auditorias e o uso de testnets.

---

## Conclusão

Desenvolver contratos inteligentes na EVM pode parecer complexo no início, mas com o conhecimento certo e as ferramentas adequadas, esse processo pode se tornar muito mais eficiente e seguro. Dominar a EVM é essencial para qualquer desenvolvedor que queira construir na blockchain Ethereum ou em redes compatíveis.

Praticar e seguir as boas práticas discutidas aqui são passos fundamentais para garantir que seus contratos não apenas funcionem corretamente, mas também sejam seguros e escaláveis.

---

## Lição de casa

1. **Instalar e configurar** o Foundry no seu ambiente de desenvolvimento.
2. **Escrever um smartcontract simples** em Solidity (pode ser um contrato de "Hello World" ou algo mais elaborado).
3. Testar seu contrato na **testnet Goerli** ou outra de sua escolha.
4. Explore o **ScaffoldETH2** e tente modificar um dos contratos existentes para entender como o projeto funciona.

---

## Próxima Aula

Na próxima aula, vamos mergulhar em um dos padrões mais utilizados no desenvolvimento de smartcontracts: o **ERC-20**, o padrão de tokens fungíveis na Ethereum. Vamos explorar a implementação, suas funções principais e como criar seu próprio token ERC-20.
