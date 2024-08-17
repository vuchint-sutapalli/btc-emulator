const express = require("express");
const http = require("http");
const cors = require("cors");
const { PORT } = require("./config");

const WebSocket = require("ws");
const { Blockchain, Transaction, Block } = require("./blockChain");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(cors());

const mainChain = new Blockchain();

const minerClients = new Map();

wss.on("connection", (ws, req) => {
  const parts = req.url.split("/");
  console.log(`miner parts ${parts}`);

  if (parts[1] === "miner") {
    const minerPort = parts[2];
    minerClients.set(minerPort, ws);
    console.log(`Miner connected on port ${minerPort}`);

    // Send the current blockchain to the newly connected miner
    ws.send(
      JSON.stringify({
        type: "CHAIN_UPDATE",
        chain: mainChain.chain,
      })
    );

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      switch (data.type) {
        case "NEW_BLOCK":
          console.log("Received new block in main:", data.block);
          const newBlock = new Block(
            data.block.index,
            data.block.timestamp,
            data.block.transactions,
            data.block.previousHash
          );
          newBlock.hash = data.block.hash;
          newBlock.nonce = data.block.nonce;

          if (mainChain.addBlock(newBlock)) {
            console.log("broadcast about new block from here");

            broadcastToMiners(
              JSON.stringify({
                type: "CHAIN_UPDATE",
                chain: mainChain.chain,
              })
            );
          }
          break;
        case "REQUEST_CHAIN":
          ws.send(
            JSON.stringify({
              type: "CHAIN_UPDATE",
              chain: mainChain.chain,
            })
          );
          break;
      }
    });

    ws.on("close", () => {
      minerClients.delete(minerPort);
      console.log(`Miner on port ${minerPort} disconnected`);
    });
  }
});

function broadcastToMiners(message) {
  console.log(`Broadcasting message to miners: ${message}`);

  for (const [minerPort, client] of minerClients) {
    if (client.readyState === WebSocket.OPEN) {
      console.log(`Sending message to miner on port ${minerPort}`);
      client.send(message);
    }
  }
}

app.get("/", (req, res) => {
  res.send("Bitcoin-like Server");
});

app.get("/chain-info", (req, res) => {
  res.send({
    totalBlocks: mainChain?.chain?.length,
    totalTransactions: 10,
    currentDifficulty: mainChain.difficulty,
  });
});

app.post("/transaction", (req, res) => {
  const { fromAddress, toAddress, amount } = req.body;
  console.log(
    `recieved transaction from client${fromAddress}  -   ${toAddress}  -  ${amount}`
  );

  try {
    const transaction = new Transaction(fromAddress, toAddress, amount);
    mainChain.addTransaction(transaction, true);
    console.log("trying to broadcast new transaction for miners to mine ");

    broadcastToMiners(
      JSON.stringify({
        type: "NEW_TRANSACTION",
        transaction,
      })
    );
    res.json({ message: "Transaction added successfully." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});
