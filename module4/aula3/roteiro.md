# Aula 4.3: Teste de Carga - Spike Testing

## Introdução

Nesta aula, vamos entender sobre o Spike Testing.

## Conceito: Spike Testing

**Por que é importante?**

**Exemplo Prático**

### Executando Spike Testing

**Preparando o Ambiente**

**Configurando o Script de Teste**

Crie um novo arquivo teste de nome `script.js` com um item a mais, dessa vez vamos criar um contador de status 200 para vermos isso no Grafana.

```javascript
import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

export let options = {
  stages: [
    // STAGIO 1: 30 segundos com 10.000 Usuários Virtuais
    { duration: "30s", target: 10000 },
    // STAGIO 2: 30 segundos para remover os 10.000 Usuários Virtuais
    { duration: "30s", target: 0 },
  ],
};

const successfulRequests = new Counter("successful_requests");
const failRequests = new Counter("fail_requests");

export default function () {
  let res = http.get("http://nginx");

  const checkResult = check(res, {
    "status was 200": (r) => r.status == 200,
  });

  if (checkResult) {
    successfulRequests.add(1);
  } else {
    failRequests.add(1);
  }
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

### Análise dos Resultados

Agora que o teste foi executado, vamos analisar os resultados, vamos olhar as métricas aqui.

### Conclusão

O Spike Testing é uma etapa fundamental em qualquer ciclo de testes de carga. Ele ajuda a detectar problemas básicos e preparar o sistema para testes mais completos. Com o ambiente Docker configurado, você pode repetir esses testes sempre que houver uma nova versão da sua aplicação, garantindo que o sistema esteja sempre pronto para o uso.

Na próxima aula vamos ver sobre o Breakpoint Testing
