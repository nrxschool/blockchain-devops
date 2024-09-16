import eth from "k6/x/ethereum";
import { Counter, Gauge } from "k6/metrics";

const PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const ALICE = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const BOB = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const NODE_RPC_URL = "http://127.0.0.1:8545";
let NONCE = 0;

export let options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 100 },
  ],
};

const ethSended = new Counter("eth_sended_counter");
const gasUsedGauge = new Gauge("gas_used_gauge");

export default function () {
  const client = new eth.Client({
    url: NODE_RPC_URL,
    privateKey: PRIVATE_KEY,
  });

  const GAS = client.gasPrice();

  const prev_nonce = client.getNonce(ALICE);
  if (NONCE < prev_nonce) {
    NONCE = prev_nonce;
  }

  const tx = {
    to: BOB,
    value: Number(0.0001 * NONCE * 1e18),
    gas_price: GAS,
    nonce: NONCE,
  };

  const txh = client.sendRawTransaction(tx);
  client.waitForTransactionReceipt(txh).then((receipt) => {
    gasUsedGauge.add(receipt.gas_used);
  });

  NONCE++;
  ethSended.add(Number(0.0001 * 1e18));
}
