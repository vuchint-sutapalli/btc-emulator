import React, { useState } from "react";
import BlockchainDashboard from "./DashBoard";
import TransactionForm from "./TransactionForm";

import useWalletAndBlockchainData from "../hooks/useWalletAndBlockchainData";
import LatestBlockComponent from "./LatestBlock";
import RecentBlocksPreview from "./RecentBlocksPreview";

import BlockTrain from "./BlockTrain";

const WalletAndDashboard = () => {
  const {
    isInitialized,
    chainInfo,
    latestBlock,
    recentBlocks,
    latestTransactions,
    message,
    createTransaction,
    setMessage,
  } = useWalletAndBlockchainData();

  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransaction = async (e) => {
    e.preventDefault();
    await createTransaction(toAddress, amount);
    setToAddress("");
    setAmount("");
  };

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">
          Initializing wallet and dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Bitcoin-like Wallet and Dashboard
      </h1>

      <BlockTrain />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TransactionForm
          createTransaction={createTransaction}
          message={message}
          setMessage={setMessage}
        />

        <div className="col-span-2">
          <LatestBlockComponent />
          <RecentBlocksPreview />
          <BlockchainDashboard
            chainInfo={chainInfo}
            latestBlock={latestBlock}
            recentBlocks={recentBlocks}
            latestTransactions={latestTransactions}
            isLoading={!isInitialized}
          />
        </div>
      </div>
    </div>
  );
};

export default WalletAndDashboard;
