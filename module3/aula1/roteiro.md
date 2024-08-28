# Aula 3.1: Introdução ao Monitoramento

## Introdução

Imagine o seguinte: você está gerenciando uma rede blockchain crítica, com transações acontecendo a todo momento e dados valiosos sendo validados em tempo real. De repente, um problema surge do nada.

Sem um sistema de monitoramento em funcionamento, como você saberia o que está acontecendo? Como você conseguiria agir rápido o suficiente para evitar um desastre?

**Bem-vindos à nossa aula sobre monitoramento!** Hoje, vamos explorar como o monitoramento é a chave para manter sua rede blockchain robusta e segura. Vamos desvendar os segredos por trás das métricas essenciais, entender o poder dos logs e descobrir como os alertas podem ser seus guardiões na linha de frente.

## Objetivos

Ao final desta aula, você não apenas entenderá a importância do monitoramento, mas estará preparado para:

- **Defender** a integridade da sua infraestrutura blockchain.
- **Focar** nas métricas que realmente importam, garantindo que tudo funcione corretamente.
- **Utilizar** logs e alertas como ferramentas de debug, para achar a raiz do problema.


### 1. Importância do Monitoramento

No universo complexo e descentralizado das blockchains, o monitoramento é mais do que uma prática recomendada, é uma necessidade vital para:

- **Garantir a Consistência da Rede:** Manter todos os nodes sincronizados é crucial. Imagine uma sinfonia onde todos os instrumentos precisam estar em perfeita harmonia. Se um instrumento desafina, a música desanda. O mesmo acontece na blockchain—o monitoramento garante que todos os nodes toquem a mesma música, sem falhas e permite que você saiba exatamente quem está desafinado.
  
- **Performance em Tempo Real:** Pense em uma avenida movimentada em uma cidade grande. Se o tráfego para, todos os veículos atrás também param. Monitorar a performance da rede blockchain permite identificar e solucionar gargalos antes que o tráfego pare, garantindo que as transações fluam como deveriam e que você encontre onde aconteceu o acidente.

- **Segurança:** Em um mundo onde blockchains são alvo de ataques constantes, o monitoramento age como um sistema de defesa avançado, detectando atividades suspeitas e permitindo ações rápidas para proteger a rede.

### 2. Métricas Essenciais

Existem quatro tipos de métricas que vamos explorar, cada uma essencial para monitorar diferentes aspectos da sua infraestrutura blockchain:

- **Host-Based Metrics:** CPU, Memória, Espaço em disco e Processos. Essas são as métricas que garantem que seu ambiente de execução, seja máquina virtual ou container, está saudável.
  
- **Application Metrics:** Foco no desempenho da aplicação (o node no caso), monitorando taxas de erro e sucesso, falhas de serviço, desempenho de resposta e uso de recursos.

- **Network Metrics:** Conectividade e desempenho de rede são vitais. Aqui, monitoramos latência, perdas de pacotes e largura de banda.

- **External Dependencies Metrics:** Para serviços de terceiros, monitoramos status, taxas de sucesso e erro, além de custos operacionais.

#### 2.1 Métricas em Blockchain

Quando falamos de blockchain, algumas métricas se destacam:

- **Capacidade de Armazenamento:** Em uma blockchain que sempre cresce, monitorar o uso de espaço em disco ajuda a planejar antes que o espaço acabe.
  
- **Latência das Transações e Tempo de Propagação dos Blocos:** Essas métricas garantem que a rede esteja operando com eficiência máxima, identificando atrasos antes que se tornem problemas.

- **Throughput:** Quantidade de transações processadas por segundo (TPS) é o pulso da rede. Monitorá-lo garante que a rede não sofra de lentidão.

- **Número de Peers Conectados e Sincronização dos Nós:** Monitorar o número de peers e a sincronização garante que a rede esteja conectada e operando em uníssono.

- **Gas Price Médio:** Manter o controle sobre o custo médio das transações ajuda a prever e evitar flutuações que possam impactar a usabilidade da rede.

### 3. Logs e Alertas

#### 3.1. Logs

Os logs são o registro detalhado de tudo o que acontece em uma aplicação e não é diferente em uma rede blockchain. Eles são como um diário de bordo de uma nave espacial. Sem eles, você ficaria no escuro sobre o que está acontecendo.

- **Auditoria de Atividades:** Os logs permitem rastrear todas as ações, ajudando a garantir que tudo esteja em conformidade.

- **Diagnóstico de Problemas:** Quando algo dá errado, os logs são o primeiro lugar onde você deve procurar.

- **Monitoramento de Segurança:** Logs anômalos podem indicar atividades suspeitas. Um bom sistema de monitoramento de logs é como um sistema de alarme para sua rede.

#### 3.2. Alertas

Os alertas são os sentinelas do seu sistema, prontos para avisar quando algo está fora do lugar.

- **Detecção Proativa:** Configurar alertas para métricas críticas permite que você aja antes que os problemas se agravem.
  
- **Automação de Respostas:** Com as ferramentas certas, você pode automatizar respostas a certos alertas, minimizando o impacto de problemas.

## Conclusão

Vamos recapitular o que você aprendeu:

- O que é o monitoramento e sua importância.
- Quais são as métricas úteis em um sistema blockchain.
- O que são os logs, alertas, e o pra que eles servem.

Na próxima aula vamos ver isso na prática como coletar métricas com o Prometheus!
