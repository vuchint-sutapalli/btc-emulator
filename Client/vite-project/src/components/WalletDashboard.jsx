import React from "react";
import BlockchainDashboard from "./DashBoard";
import TransactionForm from "./TransactionForm";

// import useBlockChainData from "../hooks/useBlockChainData";
import useWallet from "../hooks/useWallet";
import LatestBlockComponent from "./LatestBlock";
import RecentBlocksPreview from "./RecentBlocksPreview";

import BlockTrain from "./BlockTrain";
import { useData } from "../contexts/BlockChainContext";

const WalletAndDashboard = () => {
  const {
    isInitialized,
    chainInfo,
    latestBlock,
    recentBlocks,
    latestTransactions,
  } = useData();

  const {
    isWalletInitialized,
    createTransaction,
    message: walletMessage,
    wallet,
    initializeWallet,
    setMessage: setWalletMessage,
  } = useWallet();

  // if (!isInitialized) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <p className="text-gray-500 text-lg">
  //         Initializing wallet and dashboard...
  //       </p>
  //     </div>
  //   );
  // }
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <p className="text-indigo-600 text-lg font-semibold">
          Initializing wallet and dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-12">
          Bitcoin-like Wallet and Dashboard
        </h1>

        <div className="mb-12">
          <BlockTrain />
        </div>

        <div className="mb-12">
          {isWalletInitialized ? (
            <TransactionForm
              createTransaction={createTransaction}
              message={walletMessage}
              setMessage={setWalletMessage}
              publicKey={wallet?.publicKey}
            />
          ) : (
            <button
              onClick={initializeWallet}
              className="w-full bg-[#B4D421] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Create Wallet
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <LatestBlockComponent />
            <BlockchainDashboard
              chainInfo={chainInfo}
              latestBlock={latestBlock}
              recentBlocks={recentBlocks}
              latestTransactions={latestTransactions}
              isLoading={!isInitialized}
            />
          </div>
          <div className="lg:col-span-1">
            <RecentBlocksPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAndDashboard;
