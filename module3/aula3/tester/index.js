const readline = require("readline");
const dotenv = require("dotenv");
const Web3 = require("web3");

dotenv.config();

const PRIVATE_KEY =
"0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const BESU_URL = "http://localhost:8545";
const web3 = new Web3(BESU_URL);
const BOB = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const ALICE = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

async function transferETH(fromAddress, toAddress, amount) {
  let nonce;
  let gasPrice;
  let signedTx;
  try {
    nonce = await web3.eth.getTransactionCount(fromAddress);
    console.log("✅ Get nonce sucessful: ", nonce);
  } catch (error) {
    console.error("Erro ao pegar o nonce: ", error.message);
  }
  try {
    gasPrice = await web3.eth.getGasPrice();
    console.log("✅ Get gasPrice successful: ", gasPrice);
  } catch (error) {
    console.error("Erro ao pegar o gasPrice: ", error.message);
  }

  const tx = {
    from: fromAddress,
    to: toAddress,
    value: amount,
    gasPrice: gasPrice,
    nonce: nonce,
    chainId: 31337,
    value: web3.utils.toHex(0),
    gas: web3.utils.toHex(50000),
  };
  try {
    signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    console.log("✅ Sign tx successful");
  } catch (error) {
    console.error("Erro ao assinar a tx: ", error.message);
  }

  try {
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(
      "✅ Transfer successful. Transaction hash: ",
      txReceipt.transactionHash
    );
  } catch (error) {
    console.error("Error enviar a tx: ", error.message);
  }
}

async function main() {
  console.log("---------PRESS ENTER TO TRANSFER ETH-----------");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (input) => {
    console.warn("Transfer BOB to ALICE");

    try {
      await transferETH(BOB, ALICE, web3.utils.toWei("1", "ether"));
    } catch (error) {
      console.error(error);
    }
    console.log("\n\n---------PRESS ENTER TO TRANSFER ETH AGAIN-----------");
  });
}

main();
