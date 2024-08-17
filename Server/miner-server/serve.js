const WebSocket = require("ws");
const { Blockchain, Transaction, Block } = require("../main-server/blockChain");
const { PORT, RECONNECT_INTERVAL, MINING_INTERVAL } = require("./config");

const port = PORT || process.argv[2] || 3001;
let ws;
let isConnected = false;

let myCoin = new Blockchain(false);
const minerAddress = "miner-wallet-address-" + port; // In a real scenario, this would be a proper wallet address

function connectToServer() {
  ws = new WebSocket(`ws://localhost:3000/miner/${port}`);

  ws.on("open", () => {
    isConnected = true;
    console.log("Connected to central server");
    ws.send(JSON.stringify({ type: "REQUEST_CHAIN" }));
  });

  ws.on("message", (data) => {
    const message = JSON.parse(data);
    handleIncomingMessage(message);
  });

  ws.on("close", () => {
    isConnected = false;
    console.log(
      "Connection to central server lost. Attempting to reconnect..."
    );
    setTimeout(connectToServer, RECONNECT_INTERVAL);
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    ws.close(); // Close connection and trigger reconnect
  });
}

function handleIncomingMessage(message) {
  switch (message.type) {
    case "CHAIN_UPDATE":
      console.log("Received chain update from main", message.chain);
      const newChain = message.chain.map((blockData) => {
        const block = new Block(
          blockData.index,
          blockData.timestamp,
          blockData.transactions,
          blockData.previousHash
        );
        block.hash = blockData.hash;
        block.nonce = blockData.nonce;
        return block;
      });

      if (myCoin.replaceChain(newChain)) {
        console.log("Updated to new chain");
      } else {
        console.log("Chain update failed. Keeping the current chain.");
      }
      break;

    case "NEW_TRANSACTION":
      console.log(
        "Received new transaction from main server:",
        message.transaction
      );
      try {
        const newTransaction = new Transaction(
          message.transaction.fromAddress,
          message.transaction.toAddress,
          message.transaction.amount
        );
        myCoin.addTransaction(newTransaction, true);
      } catch (error) {
        console.error("Error adding transaction by miner:", error.message);
      }
      break;

    default:
      console.log("Unknown message type:", message.type);
  }
}

function startMining() {
  setInterval(() => {
    if (myCoin.pendingTransactions.length > 0) {
      console.log("Mining new block...");
      myCoin.minePendingTransactions(minerAddress);
      const latestBlock = myCoin.getLatestBlock();
      if (isConnected) {
        ws.send(JSON.stringify({ type: "NEW_BLOCK", block: latestBlock }));
        console.log("Mined and broadcasted new block:", latestBlock);
      } else {
        console.log("Cannot broadcast block - not connected to server");
      }
    } else {
      console.log("No pending transactions to mine");
    }
  }, MINING_INTERVAL);
}

connectToServer();
startMining();

console.log(`Miner server running on port ${port}`);
