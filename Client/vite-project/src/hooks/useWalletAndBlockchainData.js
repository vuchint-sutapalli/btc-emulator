import { useState, useEffect } from "react";
import { Frontend } from "../components/frontend.js";

import { MAIN_SERVER } from "../../config.js";

const useWalletAndBlockchainData = () => {
  const [frontend, setFrontend] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [chainInfo, setChainInfo] = useState(null);
  const [latestBlock, setLatestBlock] = useState(null);
  const [recentBlocks, setRecentBlocks] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initializeFrontend = async () => {
      try {
        const newFrontend = new Frontend(MAIN_SERVER);
        await newFrontend.initialize();
        setFrontend(newFrontend);
        setIsInitialized(true);
        await updateDashboard(newFrontend);
      } catch (error) {
        console.error("Error initializing frontend:", error);
        setMessage(`Error: ${error.message}`);
      }
    };

    initializeFrontend();
  }, []);

  useEffect(() => {
    if (!frontend) return;

    const interval = setInterval(
      () => frontend && updateDashboard(frontend),
      60000
    );
    return () => clearInterval(interval);
  }, [frontend]);

  const updateDashboard = async (frontendInstance) => {
    try {
      const info = await frontendInstance.getChainInfo();
      setChainInfo(info);
      setLatestBlock(await frontendInstance.getLatestBlock());
      setRecentBlocks(await frontendInstance.getRecentBlocks());
      setLatestTransactions(await frontendInstance.getLatestTransactions(5));
    } catch (error) {
      console.error("Error updating dashboard:", error);
      setMessage(`Error updating dashboard: ${error.message}`);
    }
  };

  const createTransaction = async (toAddress, amount) => {
    if (!frontend) return;

    try {
      const result = await frontend.createTransaction(
        toAddress,
        parseFloat(amount)
      );
      setMessage(`Transaction created: ${JSON.stringify(result)}`);
      await updateDashboard(frontend);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return {
    isInitialized,
    chainInfo,
    latestBlock,
    recentBlocks,
    latestTransactions,
    message,
    createTransaction,
    setMessage,
  };
};

export default useWalletAndBlockchainData;
