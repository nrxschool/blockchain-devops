import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Gauge, Rate, Trend } from "k6/metrics";

// Opções de teste
export let options = {
  stages: [
    // STAGE 1: 1 minuto com 1.000 Usuários Virtuais
    { duration: "4m", target: 1000 },
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


