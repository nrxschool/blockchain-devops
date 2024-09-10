# Aula 3.2: Integrando Besu, Prometheus e AlertManager com Discord

## 1. Introdução ao AlertManager e sua Importância

O AlertManager, parte do ecossistema Prometheus, foi desenvolvido para lidar com alertas de monitoramento. Ele atua como uma "central de controle", recebendo alertas de várias fontes (como Prometheus), e os redirecionando para canais de notificação, como e-mail, SMS, Slack, Discord e Telegram.

> **Dica:** Entender o AlertManager é crucial para gerenciar a saúde da sua rede blockchain. No nosso caso, vamos monitorar eventos críticos no Besu e disparar alertas para o Discord.

## 2. Como Funciona a Integração Besu-Prometheus-AlertManager

### Arquitetura Básica:

1. **Besu** - Gera métricas e logs.
2. **Prometheus** - Coleta e armazena as métricas.
3. **AlertManager** - Recebe as métricas do Prometheus e dispara alertas.
4. **Discord** - Recebe notificações sobre eventos importantes.

> **Dica:** Um complemento sobre a arquitetura do AlertManager [aqui](https://www.robustperception.io/prometheus-and-alertmanager-architecture/)

## 3. Configurando a Integração

### 3.1 Estrutura do Arquivo `docker-compose.yml`

No nosso arquivo Docker Compose, orquestramos três serviços principais: Besu, Prometheus e AlertManager. Abaixo está o trecho relevante da configuração:

```yaml
services:
  besu:
    image: hyperledger/besu:latest
    volumes:
      - ./:/config
    ports:
      - 8545:8545
      - 8546:8546
    command: --config-file=/config/besu.toml

  prometheus:
    image: prom/prometheus
    volumes:
      - ./alert-rules.yml:/etc/prometheus/alert-rules.yml
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
    depends_on:
      - besu

  alertmanager:
    image: prom/alertmanager:latest
    volumes:
      - ./alert-manager.yml:/prometheus/alert-manager.yml
    command:
      - "--config.file=/prometheus/alert-manager.yml"
    ports:
      - "9093:9093"
    depends_on:
      - prometheus
```

> **Passo a passo:** Este arquivo cria containers para o Besu (nosso nó blockchain), o Prometheus para coletar métricas, e o AlertManager para gerenciar os alertas.

### 3.2 Configurando o Prometheus

O `prometheus.yml` define como o Prometheus coleta as métricas do Besu e se comunica com o AlertManager.

```yml
global:
  scrape_interval: 5s

rule_files:
  - "alert-rules.yml"

scrape_configs:
  - job_name: "besu"
    static_configs:
      - targets: ["besu:8548"]

alerting:
  alertmanagers:
    - static_configs:
        - targets: ["alertmanager:9093"]
```

- **scrape_configs**: Aqui especificamos o node Besu e as portas expostas para capturar suas métricas.
- **alerting**: Conecta o Prometheus ao AlertManager, garantindo que os alertas sejam enviados.

> **Dica prática:** Verifique se as métricas estão sendo capturadas acessando o Prometheus em `http://localhost:9090/targets`.

### 3.3 Configuração de Alertas no AlertManager

#### Arquivo `alert-manager.yml`

Aqui definimos os canais de notificação para onde os alertas serão enviados. No exemplo abaixo, usamos um webhook do Discord.

```yml
global:
route:
  group_by: ["alertname"]
  receiver: discord_channel
  group_wait: 10s
  group_interval: 5m
  repeat_interval: 30m

receivers:
  - name: discord_channel
    discord_configs:
      - webhook_url: "DISCORD_WEBHOOK_URL"
        title: '{{ template "default.title" . }}'
        text: "{{ range .Alerts }}{{ .Annotations.summary }}\n{{ end }}"
```

Substitua `"DISCORD_WEBHOOK_URL"` pelo seu webhook gerado no Discord.

> **Passo prático:** Acesse seu servidor Discord e crie um webhook em um canal específico, permitindo que o AlertManager envie mensagens diretamente para o Discord.

#### Arquivo `alert-rules.yml`

Aqui definimos as regras de alerta. Vamos configurar um alerta para quando uma nova transação for minerada.

```yml
groups:
  - name: transaction_alerts
    rules:
      - alert: NewTransactionMined
        expr: increase(besu_blockchain_chain_head_transaction_count_counter_total[30s]) > 0
        for: 0s
        labels:
          severity: info
        annotations:
          summary: "Nova transação minerada no Besu"
          description: "Uma nova transação foi minerada nos últimos 30 segundos."
```

- **expr**: Define a lógica para o alerta, neste caso, monitorando o número de transações mineradas no Besu.
- **annotations**: O texto personalizado que será enviado ao Discord.

> **Teste rápido:** Você pode enviar manualmente uma transação para o Besu para testar esse alerta.

## 4. Testando a Integração

1. Acesse o Prometheus em `http://localhost:9090`.
2. Verifique se as métricas estão sendo capturadas em **Status > Targets**.
3. Acesse o AlertManager em `http://localhost:9093` para monitorar os alertas em tempo real.
4. Simule uma transação no Besu e observe a notificação aparecer no Discord.

> **Nota:** Você pode verificar logs dos containers para depurar possíveis erros, usando `docker logs <nome-do-container>`.

## 5. Ajustando Alertas e Escalonamento

É possível ajustar a frequência e o comportamento dos alertas no `alert-manager.yml`. Também podemos configurar múltiplos receptores, como diferentes canais para diferentes tipos de alertas, com base em criticidade.

> **Exercício:** Configure um alerta crítico no AlertManager para falhas no node Besu, como indisponibilidade.

## 6. Conclusão

Nesta aula, aprendemos a integrar o Hyperledger Besu com Prometheus e AlertManager, utilizando Discord como canal de notificação. Agora você pode monitorar eventos críticos na blockchain e ser notificado automaticamente.

> **Dica:** No futuro, você poderá expandir essa integração para incluir outros canais como Telegram, e-mail, ou até mesmo definir níveis de prioridade para diferentes alertas.

---

Essas modificações simplificam o fluxo e deixam o conteúdo mais prático, permitindo que os alunos acompanhem e testem facilmente os exemplos.
