import React, { createContext, useContext } from "react";
import useBlockChainData from "../hooks/useBlockChainData"; // Path to your custom hook

const BlockChainContext = createContext();

export const BlockChainProvider = ({ children }) => {
  const {
    isInitialized,
    chainInfo,
    latestBlock,
    recentBlocks,
    latestTransactions,
    message,
    setMessage,
    updateDashboard,
  } = useBlockChainData(); // Example API and interval

  return (
    <BlockChainContext.Provider
      value={{
        isInitialized,
        chainInfo,
        latestBlock,
        recentBlocks,
        latestTransactions,
        message,
        setMessage,
        updateDashboard,
      }}
    >
      {children}
    </BlockChainContext.Provider>
  );
};

export const useData = () => {
  return useContext(BlockChainContext);
};
