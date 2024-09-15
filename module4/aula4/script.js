import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    // Aumenta gradualmente o número de usuários virtuais
    { duration: "45s", target: 100 }, // 1 minuto com 100 usuários
    { duration: "45s", target: 500 }, // 1 minuto com 500 usuários
    { duration: "45s", target: 1000 }, // 1 minuto com 1000 usuários
    { duration: "45s", target: 5000 }, // 1 minuto com 5000 usuários
    { duration: "45s", target: 10000 }, // 1 minuto com 10000 usuários
    { duration: "45s", target: 20000 }, // 1 minuto com 20000 usuários
    { duration: "45s", target: 0 }, // Finaliza removendo todos os usuários
  ],
};

export default function () {
  let res = http.get("http://nginx");

  const checkResult = check(res, {
    "status was 200": (r) => r.status == 200,
  });

  sleep(1);
}
