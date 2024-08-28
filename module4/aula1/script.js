import { check, sleep } from "k6";
import http from "k6/http";

export const options = {
  vus: 10,
  duration: "1m30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<200"],
  },
};

export default function () {
  const res = http.get("http://host.docker.internal:8080");
  check(res, {
    "is status 200": (r) => r.status === 200,
    "body size is 615 bytes": (r) => r.body.length == 615,
  });

  sleep(1)
}
