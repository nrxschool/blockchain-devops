# Aula 4.3: Teste de Carga - Spike Testing

## Introdução

Nesta aula, vamos entender sobre o Spike Testing e alguns tipos de métricas: `Trend`, `Gauge`, `Counter` e `Rate`.

## Conceito: Spike Testing

- [Grafana docs](https://grafana.com/docs/k6/latest/testing-guides/test-types/spike-testing/)

## Ambiente do teste

- [Docker Compose](./docker-compose.yml)
- [Nodejs Server](./server.js)

## Configurando Grafana

Vamos utilizar 4 métricas nesse teste e para montar os graficos no grafana vamos precisar das seguintes queries:

- **successful_requests**: Número Total de Requests com Sucesso

```sql
SELECT sum("value") FROM "successful_requests"
```

- **fail_requests**: Número Total de Requests com Erro

```sql
SELECT sum("value") FROM "fail_requests"
```

- **response_size_gauge**: Tamanho mínimo, atual e máximo do `response.body` em bytes

```sql
SELECT min("value") AS "min", last("value") AS "current", max("value") AS "max"
FROM "response_size_gauge"
WHERE $timeFilter
GROUP BY time($interval) fill(null)
```

- **success_rate**: Taxa de Requests com Sucesso

```sql
SELECT mean("value") FROM "success_rate" WHERE $timeFilter GROUP BY time($interval) fill(null)
```

- **response_time_trend**: Tempo de resposta mínimo, médio, máximo, percentil 90 e percentil 95

```sql
SELECT min("value") AS MIN, max("value") AS MAX, mean("value") AS AVG, percentile("value", 95) AS p90, percentile("value", 99) AS p95
FROM "response_time_trend" WHERE $timeFilter GROUP BY time($__interval) fill(null)
```

## Prática: Spike Testing

Crie um novo arquivo teste de nome `script.js`.

```javascript
import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Gauge, Rate, Trend } from "k6/metrics";

// Opções de teste
export let options = {
  stages: [
    // STAGE 1: 1 minuto com 1.000 Usuários Virtuais
    { duration: "5m", target: 1000 },
    // STAGE 2: 30 segundos para remover os 1.000 Usuários Virtuais
    { duration: "30s", target: 0 },
  ],
};

// Contadores personalizados
const successfulRequests = new Counter("successful_requests");
const failRequests = new Counter("fail_requests");

// Métrica Gauge personalizada para monitorar o tamanho do conteúdo da resposta
const responseSizeGauge = new Gauge("response_size_gauge");

// Métrica Rate personalizada para calcular a taxa de sucesso
const successRate = new Rate("success_rate");

// Métrica Trend personalizada para medir o tempo de resposta
const responseTimeTrend = new Trend("response_time_trend");

export default function () {
  // Faz uma requisição HTTP
  let res = http.get("http://node");

  // Verifica o status da resposta
  const checkResult = check(res, {
    "status was 200": (r) => r.status == 200,
  });

  // Atualiza o contador de requisições com sucesso ou falha
  if (checkResult) {
    successfulRequests.add(1);
    successRate.add(1); // Marca sucesso para a métrica de taxa
  } else {
    failRequests.add(1);
    successRate.add(0); // Marca falha para a métrica de taxa
  }

  // Adiciona o tamanho do conteúdo da resposta à métrica Gauge
  responseSizeGauge.add(res.body.length);

  // Adiciona o tempo de resposta à métrica Trend
  responseTimeTrend.add(res.timings.duration);

  // Dorme 1 segundo antes da próxima iteração
  sleep(1);
}
```

**Executando o Teste**

Com o ambiente configurado, execute os seguintes comandos para rodar o Spike Test:

1. **Suba os contêineres:**

```bash
docker-compose up -d
```

2. **Execute o teste com k6:**

```bash
docker run --net=aula3_my_net --rm -i grafana/k6 run -o influxdb=http://influxdb:8086/k6 - <script.js
```

Este comando utiliza a imagem do k6 para executar o script de teste. As métricas serão enviadas para o InfluxDB, que pode ser acessado pelo Grafana.

## Dashboards no Grafana

Agora que o teste foi executado, vamos criar os graficos para analisar os resultados.

### Conclusão

O Spike Testing é uma etapa fundamental em qualquer ciclo de testes de carga. Ele ajuda a detectar problemas básicos e preparar o sistema para testes mais completos. Com o ambiente Docker configurado, você pode repetir esses testes sempre que houver uma nova versão da sua aplicação, garantindo que o sistema esteja sempre pronto para o uso.

Na próxima aula vamos ver sobre o Breakpoint Testing
