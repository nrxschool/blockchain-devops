# Aula 3.4: Logs com Grafana Loki

## 1. Introdução ao Monitoramento de Logs com Loki

Hoje vamos aprender como integrar o Hyperledger Besu com o Grafana Loki para monitorar os logs de uma rede blockchain. Monitorar logs é essencial para identificar problemas, obter insights sobre o funcionamento da rede e reagir a eventos importantes.

O **Grafana Loki** é uma ferramenta de logs eficiente e leve, projetada para trabalhar em conjunto com o Prometheus, focando na indexação mínima e oferecendo uma solução escalável para captura e busca de logs.

## 2. Arquitetura e Integração com Loki

### 2.1 O que é o Grafana Loki?

Loki é uma ferramenta de gerenciamento de logs que se integra facilmente com o Grafana para visualização. Ele se destaca por ser simples, eficiente e bem integrado com o ecossistema Prometheus. Sua arquitetura utiliza agentes de coleta como o **Promtail**, que coleta logs de diferentes fontes e os envia ao Loki para armazenamento e consulta.

### 2.2 Arquitetura de Integração

Nossa integração será composta por:

- **Hyperledger Besu** para rodar a rede blockchain.
- **Promtail** como agente de coleta de logs dos nós do Besu.
- **Loki** para armazenar e consultar os logs coletados.
- **Grafana** para visualizar os logs em dashboards customizáveis.

### 2.3 Visão Geral do Docker Compose

Utilizaremos o **Docker Compose** para orquestrar todos os serviços, facilitando a configuração e o deploy. Nosso arquivo `docker-compose.yml` inclui as seguintes definições de serviços:

- **Besu**: Vários nós da rede rodando com logs sendo armazenados em `/var/log/besu/`.
- **Promtail**: Coleta os logs dos nós Besu e envia para o Loki.
- **Loki**: Armazena os logs enviados pelo Promtail.
- **Grafana**: Visualiza os logs armazenados no Loki.

Aqui está o nosso arquivo `docker-compose.yml`:

```yml
services:
  bootnode:
    container_name: master
    environment:
      - LOG4J_CONFIGURATION_FILE=/config/log-config.xml
    image: hyperledger/besu:latest
    volumes:
      - ./logs:/var/log/besu
      - ./besu:/config
    ports:
      - 8545:8545
    command: >
      --config-file=/config/besu.toml --node-private-key-file=/config/key
    networks:
      besu-network:
        ipv4_address: 10.10.0.11

  promtail:
    image: grafana/promtail
    ports:
      - "9080:9080"
    volumes:
      - ./logs:/var/log/besu
      - ./promtail:/etc/promtail
    networks:
      - besu-network

  loki:
    image: grafana/loki
    ports:
      - "3100:3100"
    command:
      - -config.file=/etc/loki/local-config.yaml
      - -print-config-stderr=true
    networks:
      - besu-network
    depends_on:
      - promtail

  grafana:
    image: grafana/grafana
    environment:
      - GF_AUTH_ANONYMOUS_ENABLED=true
      - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
    ports:
      - "3000:3000"
    depends_on:
      - loki
    networks:
      - besu-network
```

### 2.4 Explicando o Promtail

O **Promtail** é o agente responsável por coletar os logs do Besu e enviá-los ao Loki. Aqui está a configuração do `promtail.yml`:

```yml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /etc/promtail/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: besu-bootnode
    static_configs:
      - targets:
          - localhost
        labels:
          job: besu
          __path__: /var/log/besu/*.log
```

Esse arquivo define como o Promtail vai coletar os logs do Besu e enviar para o Loki.

## 3. Configuração dos Logs no Besu

No Besu, os logs são configurados através do **log4j**. Aqui está o arquivo de configuração `log-config.xml` que será utilizado para definir como os logs serão gerados e armazenados:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="INFO">
  <Properties>
    <Property name="root.log.level">INFO</Property>
  </Properties>

  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSSZZZ} | %t | %-5level | %c{1} | %msg %throwable{short.message}%n" />
    </Console>

    <RollingFile name="RollingFile" 
                 fileName="/var/log/besu/besu.log"
                 filePattern="/var/log/besu/besu-%d{yyyy-MM-dd}-%i.log.gz">
      <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSSZZZ} | %t | %-5level | %c{1} | %msg %throwable{short.message}%n" />
      <Policies>
        <SizeBasedTriggeringPolicy size="10 MB" />
      </Policies>
      <DefaultRolloverStrategy max="5" /> <!-- Mantém até 5 arquivos de log antigos -->
    </RollingFile>
  </Appenders>

  <Loggers>
    <Root level="${sys:root.log.level}">
      <AppenderRef ref="Console" />
      <AppenderRef ref="RollingFile" />
    </Root>
  </Loggers>
</Configuration>
```

Essa configuração define que os logs serão armazenados em `/var/log/besu/besu.log` com um limite de 10MB por arquivo e até 5 arquivos antigos mantidos.

## 4. Testando a Integração

### 4.1 Inicializando o Ambiente

Use o comando abaixo para iniciar todos os serviços:

```bash
docker-compose up -d
```

Isso irá subir os containers do Besu, Promtail, Loki e Grafana.

### 4.2 Explorar Logs

Acesse o Grafana em `http://localhost:3000` e navegue até a seção de **Explore**. Aqui, selecione o Loki como a fonte de dados e explore os logs gerados pelos nós do Besu.

Você deve conseguir visualizar os logs em tempo real conforme eles são enviados do Promtail para o Loki.

## 5. Conclusão

Nesta aula, você aprendeu como integrar o Hyperledger Besu com o Grafana Loki para monitoramento de logs. Exploramos o uso do Promtail como agente de coleta e como visualizar esses logs usando o Grafana.

Na próxima aula, vamos criar dashboards personalizados no Grafana para monitorar os nós da rede Besu com maior facilidade visual.

