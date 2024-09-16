# Aula 4.4: Teste de Carga - Breakpoint Testing

## Introdução

Nesta aula, vamos entender como integrar o k6 com nosso ambiente blockchain e como rodar um Breakpoint Testing.

## Conceito: Spike Testing

- [Grafana docs](https://grafana.com/docs/k6/latest/testing-guides/test-types/breakpoint-testing/)

## Ambiente do teste

- [Docker Compose](./infra/docker-compose.yml)

## Configuração do Grafana

Vamos utilizar 2 tipos de métricas nesse teste para montar os graficos no grafana.

### Metricas da blockchain via Besu/Prometheus

### Métricas do teste via K6/InfluxDB

- **nonce_counter**:

```sql
SELECT sum("value") FROM "nonce_counter"
```

- **eth_sended_counter**:

```sql
SELECT sum("value") FROM "eth_sended_counter"
```

- **gas_used_gauge**:

```sql
SELECT min("value") AS "min", last("value") AS "current", max("value") AS "max"
FROM "gas_used_gauge"
WHERE $timeFilter
GROUP BY time($interval) fill(null)
```

- **tx_mined_time_trend**:

```sql
SELECT min("value") AS MIN, max("value") AS MAX, mean("value") AS AVG, percentile("value", 95) AS p90, percentile("value", 99) AS p95
FROM "tx_mined_time_trend" WHERE $timeFilter GROUP BY time($__interval) fill(null)
```

## Configuração do k6

Nesse teste vamos simular o usuário ALICE enviar ETH para o BOB várias vezes por segundo.
Porém o K6 não tem uma API js completa ou suport para libs javascript via npm.

Por isso vamos usar uma extensão chamada k6/ethereum pra isso. Então temos mais um passo antes de escrever o script de teste.

Para poder instalar essa extensão no k6 vamos precisar o `xk6` que é uma ferramenta/framework escrito em Go que faz o build de binários customizados do k6 com extensões.

**Instalar xk6 Linux**

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" \
  grafana/xk6 build \
  --with github.com/distribworks/xk6-ethereum
```

**Instalar xk6 MacOS**

```bash
docker run --rm -u "$(id -u):$(id -g)" -v "${PWD}:/xk6" -e GOOS=darwin \
  grafana/xk6 build \
  --with github.com/distribworks/xk6-ethereum
```

Feito isso vc vai ter um binário `k6` no seu diretório e é ele que vamos usar para executar os testes:

```bash
drwxr-xr-x  6 olivmath  staff   192B Sep 15 23:59 .
drwxr-xr-x  6 olivmath  staff   192B Sep 15 19:05 ..
drwxr-xr-x  6 olivmath  staff   192B Sep 15 20:52 infra
-rwxr-xr-x  1 olivmath  staff    46M Sep 15 23:59 k6
-rw-r--r--  1 olivmath  staff   4.9K Sep 15 22:31 roteiro.md
-rw-r--r--  1 olivmath  staff   1.8K Sep 15 18:39 script.js
```

## Prática: Breakpoint Testing

Crie um novo arquivo para o teste de nome `script.js`.

```javascript
import eth from "k6/x/ethereum";
import { Counter, Gauge, Trend } from "k6/metrics";

const PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const ALICE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const BOB = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const NODE_RPC_URL = "http://127.0.0.1:8545";
let NONCE = 0;

export let options = {
  stages: [
    // Aumenta gradualmente o número de usuários virtuais
    { duration: "30s", target: 1 }, // 30s com 1 usuários
    { duration: "30s", target: 5 }, // 30s com 5 usuários
    { duration: "30s", target: 10 }, // 30s com 10 usuários
    { duration: "30s", target: 50 }, // 30s com 50 usuários
    { duration: "30s", target: 100 }, // 30s com 100 usuários
    { duration: "30s", target: 200 }, // 30s com 200 usuários
    { duration: "30s", target: 0 }, // Finaliza removendo todos os usuários
  ],
};

const nonceCounter = new Counter("nonce_counter");
const ethSended = new Counter("eth_sended_counter");
const gasUsedGauge = new Gauge("gas_used_gauge");
const txMinedTime = new Trend("tx_mined_time_trend");

export default function () {
  const client = new eth.Client({
    url: NODE_RPC_URL,
    privateKey: PRIVATE_KEY,
  });

  const tx = {
    to: BOB,
    value: Number(0.0001 * 1e18),
    gas_price: client.gasPrice(),
    nonce: NONCE,
  };

  const startTime = new Date().getTime();
  const TX_HASH = client.sendRawTransaction(tx);
  client.waitForTransactionReceipt(TX_HASH).then((txMined) => {
    const endTime = new Date().getTime();

    ethSended.add(Number(0.0001 * 1e18));
    gasUsedGauge.add(txMined.gas_used);
    txMinedTime.add(endTime - startTime);
  });

  NONCE++;
  nonceCounter.add(1);
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
./k6 run ./script.js -o influxdb=http://127.0.0.1:8086/k6
```

Este comando utiliza o binário do k6 para executar o script de teste. As métricas serão enviadas para o InfluxDB, que pode ser acessado pelo Grafana.

## Dashboards no Grafana

Agora que o teste foi executado, vamos criar os graficos para analisar os resultados.

### Conclusão

O Breakpoint Testing é uma etapa fundamental em qualquer ciclo de testes de carga. Ele ajuda a detectar problemas básicos e preparar o sistema para testes mais completos. Com o ambiente Docker configurado, você pode repetir esses testes sempre que houver uma nova versão da sua aplicação, garantindo que o sistema esteja sempre pronto para o uso.

No próximo módulo vamos aprender sobre ciclo de desenvolvimento de smartcontracts o lado Dev do DevOps
