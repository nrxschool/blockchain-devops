# Aula 3.2: Integrando Besu com Prometheus

### Introdução

Antes de colocarmos a mão na gracha, um pouco de contexto.

### História do Prometheus

Prometheus foi inicialmente desenvolvido pela SoundCloud em 2012, em um momento em que a empresa enfrentava desafios significativos com o monitoramento de seus serviços. Na época, as soluções existentes não atendiam às necessidades de um ambiente de microservices dinâmico, então, eles decidiram criar uma nova ferramenta do zero.

Essa necessidade deu origem a um sistema de monitoramento que não só coletava métricas de forma eficiente, mas também permitia consultas poderosas para gerar insights acionáveis. Em 2015, o Prometheus foi lançado como um projeto open-source e, desde então, tem sido adotado amplamente pela comunidade. Sua popularidade se deve à sua flexibilidade, integração fácil com diversas tecnologias, e à poderosa linguagem de consulta PromQL.

### Arquitetura do Prometheus

Agora que entendemos a história, vamos explorar a arquitetura do Prometheus. Imagine que você está montando uma rede blockchain. Seu node precisa ser monitorado em tempo real para garantir que esteja sempre funcionando de forma otimizada. O Prometheus entra aqui coletando e armazena métricas.

[diagrama](https://prometheus.io/docs/introduction/overview/#architecture)

O Prometheus se baseia em um modelo de pull, onde ele busca as métricas diretamente dos nodes que estão sendo monitorados. Esse modelo é diferente de muitas outras soluções que utilizam push, onde os nodes enviam dados para o servidor. A vantagem do modelo de pull é que ele oferece mais controle sobre o que está sendo monitorado e permite uma escalabilidade muito maior.

Agora, vamos colocar isso em prática. Vamos rodar o Prometheus usando Docker e conectar nosso node Besu a ele.

### Overview no nosso Docker compose

Agora que entendemos o nosso [compose](./docker-compose.yml), vamos rodar tudo:

```bash
docker-compose up -d
```

Uma vez que o Prometheus estiver rodando, você pode acessá-lo no navegador em `http://localhost:9090`. Aqui, você verá a interface do Prometheus, onde vamos explorar as métricas que estamos coletando.

Vamos passar o olho no nosso [arquivo](./prometheus.yml) de configuração do prometheus.
Essa configuração instrui o Prometheus a buscar métricas do nosso node Besu a cada 5 segundos.

### Explorando as Métricas

Agora vamos acessar as métricas do Besu. No seu navegador, vá até `http://localhost:8548/metrics`. Aqui, você verá uma série de dados detalhados sobre o funcionamento do node.

Algumas métricas importantes que vamos focar são:

- **Tempo de bloco** (`besu_block_duration_seconds_sum`)
- **Número do bloco atual** (`besu_blockchain_height`)
- **Tamanho da blockchain em disco** (`besu_storage_size_bytes`)

[Lista de todas as métricas do Besu](https://besu.hyperledger.org/23.7.3/public-networks/how-to/monitor/metrics#metrics-list)

### Executando Consultas com PromQL

PromQL é a linguagem de consulta do Prometheus, e é aqui que a mágica acontece. Vamos executar alguns comandos para extrair informações valiosas:

- Para o tempo de bloco:

```bash
rate(ethereum_best_known_block_number[5m])
```

- Para o número do bloco atual:

```bash
ethereum_blockchain_height
```

- Para o tamanho da blockchain em disco:

```bash
rocksdb_bytes_written
```

### Criando Gráficos para Visualização

Agora que temos as métricas, vamos criar gráficos para visualizá-las. Dentro da interface do Prometheus, você pode criar gráficos personalizados que ajudam a visualizar o estado da sua blockchain em tempo real.

Vamos criar três gráficos:

1. **Tempo de Bloco**: Use o comando PromQL que acabamos de aprender para visualizar a duração média dos blocos.
2. **Número do Bloco Atual**: Visualize o crescimento da blockchain com o número de blocos sendo minerados.
3. **Tamanho da Blockchain em Disco**: Veja como o tamanho da blockchain cresce ao longo do tempo.

### Conclusão

Agora você tem o conhecimento de:

- monitorar e visualizar métricas usando Prometheus

Na próxima aula, vamos entender como gerar alertas usando essas métricas com o AlertManager.
