# Aula 3.3: Integrando Besu, Prometheus e AlertManager com Discord

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

- **[docker-compose.yml](./docker-compose.yml)**

> **Passo a passo:** Este arquivo cria containers para o Besu (nosso nó blockchain), o Prometheus para coletar métricas, e o AlertManager para gerenciar os alertas.

### 3.2 Configurando o Prometheus

O `prometheus.yml` define como o Prometheus coleta as métricas do Besu e se comunica com o AlertManager.

- **[prometheus.yml](./prometheus/prometheus.yml)**

- **scrape_configs**: Aqui especificamos o node Besu e as portas expostas para capturar suas métricas.
- **alerting**: Conecta o Prometheus ao AlertManager, garantindo que os alertas sejam enviados.

> **Dica prática:** Verifique se as métricas estão sendo capturadas acessando o Prometheus em `http://localhost:9090/targets`.

### 3.3 Configuração de Alertas no AlertManager

#### Arquivo `alert-manager.yml`

Aqui definimos os canais de notificação para onde os alertas serão enviados. No exemplo abaixo, usamos um webhook do Discord.

- **[prometheus.yml](./prometheus/alert-rules.yml)**

Substitua `"DISCORD_WEBHOOK_URL"` pelo seu webhook gerado no Discord.

> **Passo prático:** Acesse seu servidor Discord e crie um webhook em um canal específico, permitindo que o AlertManager envie mensagens diretamente para o Discord.

#### Arquivo `alert-rules.yml`

Aqui definimos as regras de alerta. Vamos configurar um alerta para quando uma nova transação for minerada.

- **[alert-rules.yml](./alertmanager/alert-manager.yml)**

- **expr**: Define a lógica para o alerta, neste caso, monitorando o número de transações mineradas no Besu.
- **annotations**: O texto personalizado que será enviado ao Discord.

> **Teste rápido:** Você pode enviar manualmente uma transação para o Besu para testar esse alerta.

## 4. Testando a Integração

1. Acesse o Prometheus em `http://localhost:9090`.
2. Verifique se as métricas estão sendo capturadas em **Status > Targets**.
3. Acesse o AlertManager em `http://localhost:9093` para monitorar os alertas em tempo real.
4. Simule uma transação no Besu e observe a notificação aparecer no Discord.

## 5. Ajustando Alertas e Escalonamento

É possível ajustar a frequência e o comportamento dos alertas no `alert-manager.yml`. Também podemos configurar múltiplos receptores, como diferentes canais para diferentes tipos de alertas, com base em criticidade.

> **Exercício:** Configure um alerta crítico no AlertManager para falhas no node Besu, como indisponibilidade.

## 6. Conclusão

Nesta aula, aprendemos a integrar o Hyperledger Besu com Prometheus e AlertManager, utilizando Discord como canal de notificação. Agora você pode monitorar eventos críticos na blockchain e ser notificado automaticamente.

> **Dica:** No futuro, você poderá expandir essa integração para incluir outros canais como Telegram, e-mail, ou até mesmo definir níveis de prioridade para diferentes alertas.

---

Essas modificações simplificam o fluxo e deixam o conteúdo mais prático, permitindo que os alunos acompanhem e testem facilmente os exemplos.
