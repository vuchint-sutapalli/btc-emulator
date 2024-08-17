import React, { useState, useEffect } from "react";
import { Frontend } from "./frontend";

const Wallet = () => {
  const [frontend, setFrontend] = useState(null);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeFrontend = async () => {
      const newFrontend = new Frontend("http://localhost:3000");
      await newFrontend.initialize();
      setFrontend(newFrontend);
      setIsInitialized(true);
    };

    initializeFrontend();
  }, []);

  const handleTransaction = async (e) => {
    e.preventDefault();
    if (!frontend) return;

    try {
      const result = await frontend.createTransaction(
        toAddress,
        parseFloat(amount)
      );
      setMessage(`Transaction created: ${JSON.stringify(result)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (!isInitialized) {
    return <div>Initializing wallet...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bitcoin-like Wallet</h2>
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
      {message && <p className="mt-4 p-2 bg-gray-100 rounded">{message}</p>}
    </div>
  );
};

export default Wallet;
