import React, { useState } from "react";
import BlockchainDashboard from "./DashBoard";

import useWalletAndBlockchainData from "../hooks/useWalletAndBlockchainData";

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
    return <div>Initializing wallet and dashboard...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">
        Bitcoin-like Wallet and Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Wallet</h2>
          <form onSubmit={handleTransaction} className="space-y-4">
            <div>
              <label htmlFor="toAddress" className="block mb-1">
                To Address:
              </label>
              <input
                type="text"
                id="toAddress"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block mb-1">
                Amount:
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                required
                min="0"
                step="0.00000001"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Send Transaction
            </button>
          </form>
          {message && (
            <p className="mt-4 p-2 bg-gray-100 rounded">
              {message}
              <button
                onClick={() => setMessage("")}
                className="ml-2 text-sm text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </p>
          )}
        </div>

        <div>
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
