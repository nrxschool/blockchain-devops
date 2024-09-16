import eth from "k6/x/ethereum";
import { Counter, Gauge, Trend } from "k6/metrics";

const PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const ALICE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const BOB = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const NODE_RPC_URL = "http://127.0.0.1:8545";
let NONCE = 0;

export let options = {
  stages: [
    // Aumenta gradualmente o número de usuários virtuais
    { duration: "5m", target: 10 }, // 30s com 1 usuários
  ],
};

const nonceCounter = new Counter("nonce_counter");
const ethSended = new Counter("eth_sended_counter");
const gasUsedGauge = new Gauge("gas_used_gauge");
const txMinedTime = new Trend("tx_mined_time_trend");

export default function () {
  const client = new eth.Client({
    url: NODE_RPC_URL,
    privateKey: PRIVATE_KEY,
  });

  const GAS = client.gasPrice();

  let prev_nonce = client.getNonce(ALICE);
  if (NONCE < prev_nonce) {
    NONCE = prev_nonce;
  }

  const tx = {
    to: BOB,
    value: Number(0.0001 * 1e18),
    gas_price: GAS,
    nonce: NONCE,
  };

  client.sendRawTransaction(tx);

  NONCE++;
  nonceCounter.add(1);
  ethSended.add(Number(0.0001 * 1e18));
}
