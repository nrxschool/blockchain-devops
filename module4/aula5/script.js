import eth from "k6/x/ethereum";
import { Counter, Gauge, Trend, Rate } from "k6/metrics";

const PRIVATE_KEY =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const BOB = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const NODE_RPC_URL = "http://127.0.0.1:8545";
let NONCE = 0;

export let options = {
  stages: [
    { duration: "30s", target: 1 },
    { duration: "30s", target: 5 },
    { duration: "30s", target: 10 },
    { duration: "30s", target: 50 },
    { duration: "30s", target: 100 },
    { duration: "30s", target: 200 },
    { duration: "30s", target: 0 },
  ],
};

// Métricas personalizadas
const txSended = new Counter("txSended");
const gasUsed = new Gauge("gasUsed");
const txConfirmationTime = new Trend("txConfirmationTime");
const txMiningRate = new Rate("txMiningRate");
const senderBalance = new Gauge("senderBalance");

export default function () {
  const client = new eth.Client({
    url: NODE_RPC_URL,
    privateKey: PRIVATE_KEY,
  });

  const balance = client.getBalance(); // Captura saldo do remetente
  senderBalance.add(balance);

  const GAS = client.gasPrice();
  const startTime = new Date().getTime(); // Início do tempo de confirmação da transação

  const tx = {
    to: BOB,
    value: Number(0.0001 * 1e18),
    gas_price: GAS,
    nonce: NONCE,
  };

  const TX_HASH = client.sendRawTransaction(tx);
  NONCE++;
  txSended.add(1);

  const txReceipt = client.waitForTransactionReceipt(TX_HASH);
  const endTime = new Date().getTime(); // Fim do tempo de confirmação

  if (txReceipt.status === 1) {
    txMiningRate.add(1);
    gasUsed.add(txReceipt.gasUsed); // Adiciona o gas utilizado
    txConfirmationTime.add(endTime - startTime); // Adiciona o tempo de confirmação da transação
  } else {
    txMiningRate.add(0); // Transação falhou
  }
}
