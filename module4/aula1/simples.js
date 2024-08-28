import { sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "30s",
};

export default function () {
  const res = http.get("http://host.docker.internal:8080");
  sleep(1);
}
