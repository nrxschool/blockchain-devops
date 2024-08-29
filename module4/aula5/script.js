import http from "k6/http";
import { check, sleep } from "k6";

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const amount = 100;
const endpoint = "http://host.docker.internal:8545";

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const tx = {
    jsonrpc: "2.0",
    method: "eth_sendTransaction",
    params: [
      {
        from: "0xYourAddressHere", // Replace with your Ethereum address
        to: to,
        value: `0x${(amount * 1e18).toString(16)}`, // Convert amount to Wei
        gas: "0x5208", // 21000 in hexadecimal
      },
    ],
    id: 1,
  };

  let response = http.post(endpoint, JSON.stringify(tx), {
    headers: { "Content-Type": "application/json" },
  });

  check(response, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(1);
}
