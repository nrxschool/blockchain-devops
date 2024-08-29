import eth from "k6/x/ethereum";
import { sleep } from "k6";

const privateKey =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const from = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const amount = Number(0.1 * 1e18);
const rpcUrl = "http://localhost:8545";

const client = new eth.Client({
  url: rpcUrl,
  privateKey: privateKey,
});

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

export function setup() {
  return { nonce: client.getNonce(from) };
}

function sendTx(data) {
  console.log(`nonce => ${data.nonce}`);
  const gas = client.gasPrice();
  console.log(`gas price => ${gas}`);

  const bal = client.getBalance(from, client.blockNumber());
  console.log(`bal => ${bal}`);

  const tx = {
    to: to,
    value: amount,
    gas_price: gas,
    nonce: data.nonce,
  };

  const txh = client.sendRawTransaction(tx);
  console.log("tx hash => " + txh);
  data.nonce = data.nonce + 1;
}
export default function (data) {
  sendTx(data);
  sleep(1);
}
