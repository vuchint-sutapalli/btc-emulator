// TransactionForm.js
import React, { useState, useEffect } from "react";

const TransactionForm = ({ createTransaction, message, publicKey }) => {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [pubKeyString, setPubKeyString] = useState("");

  useEffect(() => {
    if (publicKey) {
      const extractKey = async () => {
        const exported = await window.crypto.subtle.exportKey(
          "spki",
          publicKey
        );
        const exportedAsString = String.fromCharCode.apply(
          null,
          new Uint8Array(exported)
        );
        setPubKeyString(exportedAsString);
      };

      extractKey();
    }
  }, [publicKey]);

  // In WalletAndDashboard component
  const handleTransaction = async (e) => {
    e.preventDefault();

    if (!toAddress || toAddress.length < 10) {
      setMessage("Please enter a valid recipient address.");
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    try {
      await createTransaction(toAddress, amount);
      setToAddress("");
      setAmount("");
    } catch (error) {
      setMessage(`Error creating transaction: ${error.message}`);
    }
  };

  //   const handleTransaction = async (e) => {
  //     e.preventDefault();
  //     await createTransaction(toAddress, amount);
  //     setToAddress("");
  //     setAmount("");
  //   };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600  col-span-1 shadow-md rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center">Wallet</h2>
      <div className="text-white bg-opacity-20 p-4 rounded-lg mb-4">
        <h3 className="text-xl font-semibold mb-2">Public Key</h3>
        <p className="text-sm break-all">{btoa(pubKeyString)}</p>
      </div>

      <form onSubmit={handleTransaction} className="space-y-4">
        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
          <label
            htmlFor="toAddress"
            className="block text-sm font-medium text-white mb-1"
          >
            To Address
          </label>
          <input
            type="text"
            id="toAddress"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="block w-full p-2 bg-white bg-opacity-10 text-white border border-white rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="Enter recipient address"
            required
          />
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-white mb-1"
          >
            Amount (BTC)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full p-2 bg-white bg-opacity-10 text-white border border-white rounded-md focus:ring-green-500 focus:border-green-500"
            required
            min="0"
            step="0.00000001"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#B4D421] text-white py-2 rounded-lg hover:ring-green-500 transition flex items-center justify-center"
        >
          Send Transaction
        </button>
      </form>
      {message && (
        <p className="mt-4 p-2 bg-white bg-opacity-10 rounded text-center">
          {message}
          <button
            onClick={() => setMessage("")}
            className="ml-2 text-sm text-gray-300 hover:text-white"
          >
            Clear
          </button>
        </p>
      )}
    </div>
  );
};

export default TransactionForm;
