import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

export let options = {
  stages: [
    { duration: "30s", target: 10000 },
    { duration: "300s", target: 0 },
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
