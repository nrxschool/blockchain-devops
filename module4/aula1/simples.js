// IMPORTS
//
// Na primeira parte do script
// importamos as bibliotecas e
// outros artefatos necessários
// para os testes.
//
import http from "k6/http";
import { sleep } from "k6";

// SETUPS
//
// Na segunda parte do script
// definimos como será o nosso
// ambiente de teste
//
export const options = {
  vus: 10,
  duration: "10s",
};

// EXECUTION
//
// Por fim na terceira parte do
// script colocamos a lógica do
// que queremos validar com o
// nosso teste.
//
export default function () {
  http.get("http://host.docker.internal:8080");
  sleep(1);
}