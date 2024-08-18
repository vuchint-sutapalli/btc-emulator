import React, { useState, useEffect } from "react";
import { ArrowDownCircle, Clock, Hash, Database } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "";
// import { Alert, AlertDescription, AlertTitle } from "./alert";
import useBlockChainData from "../hooks/useBlockChainData";

const LatestBlockComponent = () => {
  const { latestBlock } = useBlockChainData();
  //   const [latestBlock, setLatestBlock] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchLatestBlock = async () => {
  //       try {
  //         const response = await fetch("http://localhost:3000/api/latest-block");
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch latest block");
  //         }
  //         const data = await response.json();
  //         setLatestBlock(data);
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err.message);
  //         setLoading(false);
  //       }
  //     };

  //     fetchLatestBlock();
  //     // Fetch new data every 10 seconds
  //     const interval = setInterval(fetchLatestBlock, 10000);

  //     return () => clearInterval(interval);
  //   }, []);

  if (!latestBlock) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  //   if (error) {
  //     return (
  //       <Alert variant="destructive">
  //         <AlertTitle>Error</AlertTitle>
  //         <AlertDescription>{error}</AlertDescription>
  //       </Alert>
  //     );
  //   }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
      <h2 className="text-3xl font-bold mb-4 flex items-center">
        <Database className="mr-2" /> Latest Block
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Hash className="mr-2" /> Block Hash
          </h3>
          <p className="text-sm break-all">{latestBlock.hash}</p>
        </div>
        <div className="col-span-2 bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Hash className="mr-2" /> Prev Hash
          </h3>
          <p className="text-sm break-all">{latestBlock.previousHash}</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Hash className="mr-2" /> Nonce
          </h3>
          <p className="text-2xl font-bold">{latestBlock.nonce}</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <ArrowDownCircle className="mr-2" /> Block Height
          </h3>
          <p className="text-2xl font-bold">{latestBlock.index}</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            <Clock className="mr-2" /> Timestamp
          </h3>
          <p className="text-sm">
            {new Date(latestBlock.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Transactions</h3>
          <p className="text-2xl font-bold">
            {latestBlock.transactions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LatestBlockComponent;
