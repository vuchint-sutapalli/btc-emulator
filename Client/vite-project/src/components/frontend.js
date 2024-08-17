import axios from "axios";

export class Wallet {
  constructor() {
    this.privateKey = null;
    this.publicKey = null;
  }

  async generateKeyPair() {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      true,
      ["sign", "verify"]
    );

    this.privateKey = keyPair.privateKey;
    this.publicKey = keyPair.publicKey;

    // Convert public key to PEM format
    const exported = await window.crypto.subtle.exportKey(
      "spki",
      this.publicKey
    );
    const exportedAsString = String.fromCharCode.apply(
      null,
      new Uint8Array(exported)
    );
    this.publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${btoa(
      exportedAsString
    )}\n-----END PUBLIC KEY-----`;
  }

  async sign(transaction) {
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(transaction));
    const signature = await window.crypto.subtle.sign(
      {
        name: "ECDSA",
        hash: { name: "SHA-256" },
      },
      this.privateKey,
      data
    );
    return btoa(String.fromCharCode.apply(null, new Uint8Array(signature)));
  }
}

export class Frontend {
  constructor(minerUrl) {
    this.minerUrl = minerUrl;
    this.serverUrl = minerUrl;
    this.ws = null;
    this.wallet = new Wallet();
  }

  async initialize() {
    await this.wallet.generateKeyPair();
  }

  async getChainInfo() {
    const response = await fetch(`${this.serverUrl}/chain-info`);
    if (!response.ok) {
      throw new Error("Failed to fetch chain info");
    }
    return await response.json();
  }

  async getLatestBlock() {
    // let fetchUrl = `${this.serverUrl}/latest-blocks?count=${count}`;
    let fetchUrl = `${this.serverUrl}/api/latest-block`;
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch latest blocks");
    }
    return await response.json();
  }
  async getRecentBlocks() {
    // let fetchUrl = `${this.serverUrl}/latest-blocks?count=${count}`;
    let fetchUrl = `${this.serverUrl}/api/last-n-blocks`;
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch latest blocks");
    }
    return await response.json();
  }

  async getLatestTransactions(count) {
    return [];
    const response = await fetch(
      `${this.serverUrl}/latest-transactions?count=${count}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch latest transactions");
    }
    return await response.json();
  }

  async createTransaction(toAddress, amount) {
    const transaction = {
      fromAddress: this.wallet.publicKeyPEM,
      toAddress: toAddress,
      amount: amount,
    };

    const signature = await this.wallet.sign(transaction);
    const signedTransaction = {
      ...transaction,
      signature: signature,
    };

    try {
      const response = await axios.post(
        `${this.minerUrl}/transaction`,
        signedTransaction
      );
      return response.data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      throw error;
    }
  }
}
