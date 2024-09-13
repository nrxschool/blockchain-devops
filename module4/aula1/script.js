import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "2m",
  // THREASHOLDS
  //
  // Garantir que menos de 1% das requisições falhem
  // Garantir que 95% das requisições sejam concluídas em menos de 200ms.
  //
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<200"],
  },
};

export default function () {
  const res = http.get("http://host.docker.internal:80");
  // CHECK
  //
  // Validar se o status da resposta é 200.
  // Validar se o tamanho do body em bytes é 615 bytes.
  //
  check(res, {
    "is status 200": (r) => r.status === 200,
    "body size is 615 bytes": (r) => r.body.length == 615,
  });
  sleep(1);
}