import React from "react";
import BlockchainDashboard from "./DashBoard";
import TransactionForm from "./TransactionForm";

import useBlockChainData from "../hooks/useBlockChainData";
import useWallet from "../hooks/useWallet";
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
  } = useBlockChainData();

  const {
    isWalletInitialized,
    createTransaction,
    message: walletMessage,
    wallet,
    setMessage: setWalletMessage,
  } = useWallet();

  if (!isWalletInitialized) {
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
      <TransactionForm
        createTransaction={createTransaction}
        message={walletMessage}
        setMessage={setWalletMessage}
        publicKey={wallet?.publicKey}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <LatestBlockComponent />
          <BlockchainDashboard
            chainInfo={chainInfo}
            latestBlock={latestBlock}
            recentBlocks={recentBlocks}
            latestTransactions={latestTransactions}
            isLoading={!isInitialized}
          />
        </div>
        <div className="col-span-2">
          <RecentBlocksPreview />
        </div>
      </div>
    </div>
  );
};

export default WalletAndDashboard;
