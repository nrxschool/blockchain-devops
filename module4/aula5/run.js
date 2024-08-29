const { createWalletClient, http } = require("viem");
const { privateKeyToAccount } = require("viem/accounts");
const { mainnet } = require("viem/chains");
const { parseGwei } = require("viem");

(async () => {
  const client = createWalletClient({ chain: mainnet, transport: http() });
  const account = privateKeyToAccount(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
  );


  const transaction = {
    to: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    value: parseGwei("0.1"),
    gas: 21000,
    gasPrice: parseGwei("20"),
  };

  try {
    const signedTransaction = await account.signTransaction(transaction);
    const txHash = await client.sendTransaction({
      account,
      transaction: signedTransaction,
    });

    console.log("Tx hash: ", txHash);
  } catch (error) {
    console.error("Erro ao assinar a transação:", error);
  }
})();
