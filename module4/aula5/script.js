import eth from "k6/x/ethereum";
import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

const PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const BOB = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const NODE_RPC_URL = "http://127.0.0.1:8545";
let NONCE = 0

export let options = {
  stages: [
    // Aumenta gradualmente o número de usuários virtuais
    { duration: "30s", target: 1}, // 30s com 1 usuários
    { duration: "30s", target: 5}, // 30s com 5 usuários
    { duration: "30s", target: 10}, // 30s com 10 usuários
    { duration: "30s", target: 50}, // 30s com 50 usuários
    { duration: "30s", target: 100}, // 30s com 100 usuários
    { duration: "30s", target: 200}, // 30s com 200 usuários
    { duration: "30s", target: 0 }, // Finaliza removendo todos os usuários
  ],
};

const txSended = new Counter("txSended");

export default function () {
  const client = new eth.Client({
    url: NODE_RPC_URL,
    privateKey: PRIVATE_KEY,
  });

  console.log(`NONCE >>> ${NONCE}`);
  const GAS = client.gasPrice();
  console.log(`GAS >>> ${GAS}`);

  const tx = {
    to: BOB,
    value: Number(0.0001 * 1e18),
    gas_price: GAS,
    nonce: NONCE,
  };

  const TX_HASH = client.sendRawTransaction(tx);
  console.log(`TX_HASH >>> ${TX_HASH}`);

  NONCE++;

  txSended.add(1);
}
