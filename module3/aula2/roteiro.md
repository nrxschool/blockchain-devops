# Aula 3.2: Integrando Besu com Prometheus

### Introdução

Hoje, vamos mergulhar em uma das ferramentas mais poderosas para o monitoramento em sistemas distribuídos: o Prometheus. Se você já se perguntou como grandes empresas mantêm suas infraestruturas robustas e seguras, o Prometheus faz parte da resposta. Mas, para entender todo o potencial dessa ferramenta, precisamos começar pela sua origem e como ela se tornou uma peça fundamental no ecossistema DevOps.

### História do Prometheus

Prometheus foi inicialmente desenvolvido pela SoundCloud em 2012, em um momento em que a empresa enfrentava desafios significativos com o monitoramento de seus serviços. Na época, as soluções existentes não atendiam às necessidades de um ambiente de microservices dinâmico, então, eles decidiram criar uma nova ferramenta do zero.

Essa necessidade deu origem a um sistema de monitoramento que não só coletava métricas de forma eficiente, mas também permitia consultas poderosas para gerar insights acionáveis. Em 2015, o Prometheus foi lançado como um projeto open-source e, desde então, tem sido adotado amplamente pela comunidade. Sua popularidade se deve à sua flexibilidade, integração fácil com diversas tecnologias, e à poderosa linguagem de consulta PromQL.

### Arquitetura do Prometheus

Agora que entendemos a história, vamos explorar a arquitetura do Prometheus. Imagine que você está montando uma rede blockchain. Seu node precisa ser monitorado em tempo real para garantir que esteja sempre funcionando de forma otimizada. O Prometheus entra aqui como seu aliado, funcionando como um guardião que coleta e armazena métricas a cada segundo.

O Prometheus se baseia em um modelo de pull, onde ele busca as métricas diretamente dos nodes que estão sendo monitorados. Esse modelo é diferente de muitas outras soluções que utilizam push, onde os nodes enviam dados para o servidor. A vantagem do modelo de pull é que ele oferece mais controle sobre o que está sendo monitorado e permite uma escalabilidade muito maior.

Agora, vamos colocar isso em prática. Vamos rodar o Prometheus usando Docker e conectar nosso node Besu a ele.

### Projeto Prático: Rodando o Prometheus com Docker

Primeiro, vamos iniciar o Prometheus. Se você seguiu a aula anterior, já tem um Docker Compose configurado com o serviço do Prometheus. Então, basta rodar o comando:

```bash
docker-compose up -d
```

Uma vez que o Prometheus estiver rodando, você pode acessá-lo no navegador em `http://localhost:9090`. Aqui, você verá a interface do Prometheus, onde vamos explorar as métricas que estamos coletando.

---

**Parte 2: Integrando o Besu com Prometheus**

---

### Introdução

Agora que você já sabe como rodar o Prometheus, vamos integrá-lo ao nosso node Besu. Essa integração é crucial para monitorar métricas em tempo real da nossa blockchain, desde o tempo de bloco até o tamanho da cadeia.

### Configurando Jobs e Targets

Primeiro, precisamos configurar o Prometheus para monitorar o nosso node Besu. Vamos utilizar a porta `8548`, que é onde o Besu expõe suas métricas.

No arquivo `prometheus.yml`, já configuramos um job para o Besu:

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'besu_node'
    static_configs:
      - targets: ['besu:8548']
```

Essa configuração instrui o Prometheus a buscar métricas do nosso node Besu a cada 5 segundos.

### Explorando as Métricas

Com o Prometheus rodando e configurado, vamos agora acessar as métricas do Besu. No seu navegador, vá até `http://localhost:8548/metrics`. Aqui, você verá uma série de dados detalhados sobre o funcionamento do node.

Algumas métricas importantes que vamos focar são:

- **Tempo de bloco** (`besu_block_duration_seconds_sum`)
- **Número do bloco atual** (`besu_blockchain_height`)
- **Tamanho da blockchain em disco** (`besu_storage_size_bytes`)

### Executando Consultas com PromQL

PromQL é a linguagem de consulta do Prometheus, e é aqui que a mágica acontece. Vamos executar alguns comandos para extrair informações valiosas:

- Para o tempo de bloco:
  ```promql
  rate(besu_block_duration_seconds_sum[5m])
  ```
- Para o número do bloco atual:
  ```promql
  besu_blockchain_height
  ```
- Para o tamanho da blockchain em disco:
  ```promql
  besu_storage_size_bytes
  ```

### Criando Gráficos para Visualização

Agora que temos as métricas, vamos criar gráficos para visualizá-las. Dentro da interface do Prometheus, você pode criar gráficos personalizados que ajudam a visualizar o estado da sua blockchain em tempo real.

Vamos criar três gráficos:

1. **Tempo de Bloco**: Use o comando PromQL que acabamos de aprender para visualizar a duração média dos blocos.
2. **Número do Bloco Atual**: Visualize o crescimento da blockchain com o número de blocos sendo minerados.
3. **Tamanho da Blockchain em Disco**: Veja como o tamanho da blockchain cresce ao longo do tempo.

### Configurando Alertas

Por fim, vamos configurar um alerta para quando novas transações forem mineradas. No Prometheus, os alertas são configurados para monitorar certos eventos e disparar notificações quando algo fora do comum acontece.

Vamos configurar um alerta simples para monitorar o número de transações:

```yaml
groups:
- name: besu_alerts
  rules:
  - alert: NewTransactions
    expr: rate(besu_blockchain_height[1m]) > 0
    for: 1m
    labels:
      severity: warning
    annotations:
      summary: "Novas transações foram mineradas"
      description: "A blockchain registrou novas transações nos últimos 5 minutos."
```

### Conclusão

E com isso, concluímos a aula de hoje. Agora você tem o conhecimento necessário para monitorar e visualizar métricas cruciais de uma blockchain usando Prometheus, além de configurar alertas para garantir que nada passe despercebido.

Na próxima aula, vamos explorar como automatizar ainda mais o monitoramento e responder a incidentes automaticamente. Até lá, continue experimentando com as ferramentas que aprendemos hoje!