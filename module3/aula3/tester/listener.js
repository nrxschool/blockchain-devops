const Web3 = require("web3");
const axios = require("axios");

const BESU_URL = "ws://127.0.0.1:8546";

const web3 = new Web3(BESU_URL);
const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1283254512739680390/fidh3A_7EfHwu6R2SRAkvkgVo0On6fvWwYm2y7WYmM71o4LqIv3vvaRRQUwF-rBLwgFZ";

const sendDiscord = async (text) => {
  const payload = {
    content: text,
  };

  try {
    const response = await axios.post(DISCORD_WEBHOOK_URL, payload);
    console.log("Mensagem enviada para o Discord:", response.status);
  } catch (error) {
    console.error("Erro ao enviar mensagem para o Discord:", error);
  }
};

web3.eth.subscribe("pendingTransactions", async (error, transactionHash) => {
  if (!error) {
    const data = `@here\n🕒 Nova transação pendente: ${transactionHash}`;
    console.log(data);
    sendDiscord(data);
  } else {
    console.error("Erro ao ouvir transações pendentes:", error);
  }
});

web3.eth.subscribe("newBlockHeaders", async (error, blockHeader) => {
  if (!error) {
    const block = await web3.eth.getBlock(blockHeader.hash, true);
    block.transactions.forEach((transaction) => {
      const data = `@here\n🔨 Transação minerada no bloco ${transaction.blockNumber}: , ${transaction.hash}`;
      console.log(data);
      sendDiscord(data);
    });
  } else {
    console.error("Erro ao ouvir novos blocos:", error);
  }
});

console.log("Ouvindo eventos e transações na mempool...");
