import { useState, useEffect } from "react";
import { Frontend } from "../components/frontend.js";

const useWalletAndBlockchainData = () => {
  const [frontend, setFrontend] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [chainInfo, setChainInfo] = useState(null);
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [latestTransactions, setLatestTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const initializeFrontend = async () => {
      try {
        const newFrontend = new Frontend("http://localhost:3000");
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
    const interval = setInterval(
      () => frontend && updateDashboard(frontend),
      10000
    );
    return () => clearInterval(interval);
  }, [frontend]);

  const updateDashboard = async (frontendInstance) => {
    try {
      const info = await frontendInstance.getChainInfo();
      setChainInfo(info);
      setLatestBlocks(await frontendInstance.getLatestBlocks(5));
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
    latestBlocks,
    latestTransactions,
    message,
    createTransaction,
    setMessage,
  };
};

export default useWalletAndBlockchainData;
