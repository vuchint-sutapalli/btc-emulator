import { useState, useEffect } from "react";

import { Wallet } from "../lib/helpers/wallet";
import { BlockchainService } from "../lib/helpers/blockChain";
import { MAIN_SERVER } from "../../config.js";

const useWalletOperations = () => {
  const [wallet, setWallet] = useState(null);
  const [isWalletInitialized, setIsWalletInitialized] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initializeWallet = async () => {
      try {
        const newWallet = new Wallet();
        await newWallet.generateKeyPair();
        setWallet(newWallet);
        setIsWalletInitialized(true);
        setMessage("Wallet initialized successfully");
        console.log("Wallet initialized successfully");
      } catch (error) {
        console.error("Error initializing wallet:", error);
        setMessage(`Error initializing wallet: ${error.message}`);
      }
    };

    initializeWallet();
  }, []);

  const createTransaction = async (toAddress, amount) => {
    if (!wallet) {
      setMessage("Wallet not initialized. Please initialize wallet first.");
      return;
    }

    try {
      const blockchainService = new BlockchainService(MAIN_SERVER);
      const transaction = {
        fromAddress: wallet.publicKeyPEM,
        toAddress: toAddress,
        amount: parseFloat(amount),
      };
      const signature = await wallet.sign(transaction);
      const result = await blockchainService.createTransaction(
        transaction,
        signature
      );
      setMessage(`Transaction created: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Error creating transaction: ${error.message}`);
    }
  };

  return {
    isWalletInitialized,
    wallet,
    createTransaction,
    message,
    setMessage,
  };
};

export default useWalletOperations;
