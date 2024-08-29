import http from "k6/http";
import { sleep } from "k6";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://host.docker.internal:8545")
);

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const to = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
const amount = 100;

export const options = {
  stages: [
    { duration: "10s", target: 20 },
    { duration: "10s", target: 10 },
    { duration: "10s", target: 0 },
  ],
};

export default function () {
  const tx = {
    to: receiverAddress,
    value: web3.utils.toWei("1", "ether"),
    gas: 21000,
  };

  web3.eth.accounts.signTransaction(tx, senderPrivateKey).then((signedTx) => {
    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on("receipt", (receipt) => {
        console.log(
          "Transaction successful with hash: ",
          receipt.transactionHash
        );
      })
      .on("error", (err) => {
        console.error("Transaction failed: ", err);
      });
  });

  sleep(1);
}
