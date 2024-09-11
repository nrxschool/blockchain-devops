# Aula 3.4: Integrando Besu + Prometheus + Grafana

### Introdução

Se você já esteve envolvido com DevOps, monitoramento de sistemas ou blockchain, provavelmente já ouviu falar do Grafana. Hoje, vamos explorar essa poderosa ferramenta de visualização de dados que, quando integrada ao Prometheus, leva o monitoramento a um novo patamar.

### História do Grafana

O Grafana foi lançado em 2014 por Torkel Ödegaard como uma solução open-source para visualização de dados. Inicialmente, ele se concentrou em oferecer uma interface simples e intuitiva para monitorar métricas coletadas de diferentes fontes de dados. Em pouco tempo, o Grafana cresceu, tornando-se a escolha número um para dashboards interativos e alertas. A grande sacada? Sua capacidade de se integrar com praticamente qualquer fonte de dados, desde bancos de dados relacionais até serviços de monitoramento como o Prometheus.

Com sua interface amigável e uma vasta gama de plugins, o Grafana é agora uma das ferramentas mais usadas para criar painéis ricos e informativos em qualquer infraestrutura.

### Arquitetura do Grafana

- [Docs](https://grafana.com/docs/grafana/)
- [Arch](https://doubletapp.medium.com/overview-of-monitoring-system-with-prometheus-and-grafana-9ce6501eff88)

A arquitetura do Grafana se baseia em três elementos principais:

1. **Backends de dados**: O Grafana não coleta dados por si só. Ele utiliza backends de dados, como o Prometheus, para buscar as métricas.
2. **Dashboards**: Esses são painéis interativos onde você pode visualizar seus dados, criar gráficos e configurar alertas.
3. **Alertas**: O Grafana também permite configurar alertas baseados nas métricas monitoradas, notificando você quando algo crítico acontece.

Agora, vamos integrar o Grafana ao nosso ambiente e criar um dashboard para monitorar as métricas do nosso node Besu.

---

**Parte 2: Integrando Grafana com Prometheus e Besu**

---

### Preparando o Ambiente

Antes de mais nada, precisamos configurar o Grafana no nosso ambiente Docker. Vamos adicionar um novo serviço ao arquivo `docker-compose.yml` para rodar o Grafana:

```yaml
services:
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    depends_on:
      - prometheus
```

Com isso, nosso Grafana estará disponível em `http://localhost:3000`. Agora, podemos rodar o seguinte comando para subir todos os serviços:

```bash
docker-compose up -d
```

Uma vez que tudo estiver rodando, vamos configurar a integração entre o Grafana e o Prometheus.

### Conectando Grafana ao Prometheus

1. Acesse o Grafana em `http://localhost:3000`.
2. Entre com as credenciais padrão: usuário "admin" e senha "admin".
3. Vá até **Configuration** > **Data Sources**.
4. Selecione **Add Data Source** e escolha **Prometheus**.
5. No campo **URL**, insira: `http://prometheus:9090` e salve.

Agora que o Grafana está conectado ao Prometheus, podemos começar a criar nosso dashboard.

---

**Parte 3: Criando um Dashboard Simples**

---

### Introdução ao Dashboard

Agora vamos criar um dashboard para monitorar as métricas mais importantes do nosso node Besu: o número de blocos, número de transações, uso de CPU e uso de disco. Isso nos permitirá ter uma visão clara do estado atual da blockchain e da performance do node.

### Criando os Gráficos

1. **Número de Blocos**

- No Grafana, vá até **Dashboards** > **Create** > **Add Panel**.
- No campo **Query**, use a seguinte consulta PromQL:

```promql
besu_blockchain_height
```

- Dê um nome ao gráfico, como “Número de Blocos”, e salve.

2. **Número de Transações**

- Adicione um novo painel e insira a seguinte consulta:

```promql
rate(besu_transactions_total[5m])
```

- Nomeie o gráfico como “Número de Transações” e salve.

3. **Uso de CPU**

- Para o uso de CPU, insira a seguinte consulta PromQL:

```promql
rate(node_cpu_seconds_total[5m])
```

- Nomeie o gráfico como “Uso de CPU” e salve.

Agora temos um dashboard básico que cobre os principais pontos de monitoramento do node Besu.

---

**Parte 4: Configurando Alertas no Grafana**

---

### Introdução aos Alertas

Os alertas no Grafana são uma ferramenta vital para manter seus sistemas sob controle. Eles são configurados diretamente nos painéis e, ao serem acionados, enviam notificações por e-mail, Slack ou outras ferramentas de comunicação.

### Criando um Alerta para Novas Transações

Vamos configurar um alerta para quando novas transações forem mineradas. Siga os passos abaixo:

1. Selecione o painel do **Status do node**.
2. Clique no ícone de configurações e vá para a aba **Alert**.
3. Adicione uma nova regra de alerta com o seguinte critério:
   - **Condition**: Quando o status for `0` por `10s`
   - **Query**:

```js
up{job="besu_node"}
```

4. Configure o alerta para disparar uma notificação quando novas transações forem detectadas.
5. Salve o alerta.

Agora, sempre que uma nova transação for minerada no node, o alerta será disparado, e você receberá uma notificação.

---

### Conclusão

E com isso, completamos a integração do Besu, Prometheus e Grafana. Agora, você tem uma visualização completa das métricas do seu node blockchain e pode configurar alertas para garantir que qualquer atividade crítica seja monitorada em tempo real.

Na próxima aula, vamos explorar como automatizar ainda mais esses processos e aprofundar o uso do Grafana para criar dashboards mais complexos. Até lá, continue experimentando com o que aprendemos hoje!
