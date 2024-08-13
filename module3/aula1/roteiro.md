# Aula 3.1: Introdução ao Monitoramento

## Introdução

Bem-vindos à nossa aula sobre monitoramento! Agora vamos entender a importância do monitoramento em sistemas de TI, eu vou mostrar quais são as métricas essenciais, e falar um pouco sobre logs e alertas. Monitoramento é um grande aliado para manter uma rede blockchain robusta e segura.

## Objetivos

Ao final desta aula, você terá uma compreensão sólida de:

- **Por que** o monitoramento é vital para a saúde de uma infraestrutura blockchain.
- **Quais** métricas você deve focar para garantir que seus nodes e aplicações estejam funcionando de forma otimizada.
- **Como** utilizar logs e alertas para antecipar problemas e manter sua rede blockchain sempre disponível e segura.

## Tópicos

### 1. Importância do Monitoramento

No universo blockchain, onde lidamos com sistemas distribuídos complexos o monitoramento vai além de apenas manter os sistemas em funcionamento; ele é a chave para:

- **Garantir a Consistência da Rede:** Em uma rede blockchain, manter todos os nodes sincronizados e operando sem falhas é essencial para a segurança e a integridade dos dados. Monitorar a saúde desses nodes é o que nos permite detectar problemas de forma proativa.
- **Performance em Tempo Real:** Imagine um cenário onde as transações estão levando mais tempo que o esperado para serem validadas. Monitorando métricas como latência e throughput, você pode rapidamente identificar gargalos de performance e agir antes que eles se tornem problemas maiores.

- **Segurança:** Blockchains são frequentemente alvos de ataques maliciosos. O monitoramento constante nos permite identificar atividades suspeitas e responder rapidamente para mitigar possíveis danos.

### 2. Métricas Essenciais

As métricas básicas se dividem em 4 tipos dependendo da sua métodologia:

- Host-Based Metrics: Aqui estamos olhando pra máquina ou container e seu uso de: CPU, Memória, Espaço em disco e Processos
- Application Metrics: Quando queremos saber sobre a aplicação: Taxas de erro e sucesso, Falhas e reinicializações de serviço, Desempenho e latência das respostas, Uso de recursos
- Network Metrics: Olhando para as conexões da nossa máquina/container temos: Conectividade, Taxas de erro e perda de pacotes, Latência, Utilização da largura de banda
- External Dependencies Metrics: Medir a saúde de serviços que dependemos ajuda a rastrear o impacto de provedores em nossos sistemas, como por exemplo: Status e disponibilidade do serviço, Taxas de sucesso e erro, Taxa de execução e custos operacionais.

### 2.1 Métricas em Blockchain

Um dos fatores mais importantes que afetam se algo é medido é seu potencial para ajudar no futuro. Cada métrica adicional rastreada aumenta a complexidade do sistema e ocupa recursos. Métricas que são críticas para um sistema podem não ser para outros, vamos ver agora algumas das métricas interessante quando falamos de blockchain:

- **Capacidade de Armazenamento:** O crescimento constante da blockchain significa que o espaço em disco é uma preocupação real. Acompanhar de perto o uso de disco ajuda a planejar expansões de capacidade antes que se tornem críticas.

- **Latência das Transações:** Tempo médio que uma transação leva desde a submissão até a inclusão em um bloco.

- **Tempo de Propagação dos Blocos:** Tempo necessário para que um bloco recém-criado seja propagado por toda a rede.

- **Throughput:** Número de transações processadas por segundo (TPS).

- **Número de Peers Conectados:** Quantidade de peers ativos conectados ao node.

- **Uptime:** Percentual de tempo em que o node ou serviço está disponível.

- **Gas Price Médio:** Monitoramento do custo médio para executar uma transação.

- **Frequência de Downtime:** Número de incidentes em que o sistema ou node ficou inoperante.

- **Tempo de bloco:** Tempo médio para um novo bloco ser adicionado à cadeia.

- **Tamanho de bloco:** Tamanho médio dos últimos blocos adicionados na blockchain.

- **MTTR (Mean Time to Recovery):** Tempo médio necessário para restaurar o sistema após uma falha.

- **Sincronização dos nós:** Qual a diferença de blocos entre nodes conectados na mesma rede blockchain.

- **Latência de Rede:** Em uma rede distribuída como o blockchain, a latência pode afetar a eficiência de validação de transações. Monitorar a latência ajuda a identificar problemas de conectividade que possam estar impactando a performance da rede.

- **Taxas de Erro e Desempenho de Transações:** Taxas anormais de erros em transações podem ser um sinal de que algo está errado, seja com um smart contract específico ou com a infraestrutura subjacente.

### 3. Logs e Alertas

#### 3.1. Logs

Logs são nossos olhos e ouvidos em um ambiente blockchain. Eles registram tudo, desde a criação de novos blocos até falhas de comunicação entre nodes. A análise desses logs é essencial para:

- **Auditoria de Atividades:** Em blockchains, onde a transparência e a imutabilidade são fundamentais, os logs permitem rastrear ações, ajudando a garantir a integridade da rede.
- **Diagnóstico de Problemas:** Quando algo dá errado, os logs são o primeiro lugar onde você deve olhar. Eles fornecem as pistas necessárias para diagnosticar e corrigir problemas rapidamente.
- **Monitoramento de Segurança:** Ataques à rede podem ser detectados analisando padrões anômalos nos logs, como tentativas repetidas de acesso falho ou alterações suspeitas nos nodes.

#### 3.2. Alertas

Alertas são sua linha de defesa em tempo real. Eles permitem que você reaja rapidamente a qualquer situação que possa comprometer a estabilidade da rede:

- **Detecção Proativa:** Configurar alertas para disparar quando uma métrica crítica ultrapassa um certo limite permite que você tome medidas corretivas antes que um problema afete a rede como um todo.
- **Automação de Respostas:** Com ferramentas adequadas, você pode automatizar respostas a certos tipos de alertas, como reiniciar um node que parou de responder, minimizando o tempo de inatividade.


## Conclusão

Vamos recapitular o que você aprendeu:

- O que é o monitoramento e sua importância.
- Quais são as métricas úteis em um sistema blockchain.
- O que são os logs, alertas, e o pra que eles servem.

Na próxima aula vamos ver isso na prática como coletar métricas com o Prometheus!
