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
    <div className="bg-white col-span-1 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Wallet</h2>
      <div>{btoa(pubKeyString)}</div>

      <form onSubmit={handleTransaction} className="space-y-4">
        <div>
          <label
            htmlFor="toAddress"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            To Address
          </label>
          <input
            type="text"
            id="toAddress"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter recipient address"
            required
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount (BTC)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
            min="0"
            step="0.00000001"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Transaction
        </button>
      </form>
      {message && (
        <p className="mt-4 p-2 bg-gray-100 rounded text-gray-700 text-center">
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
  );
};

export default TransactionForm;
