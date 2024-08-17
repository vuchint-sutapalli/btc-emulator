import React, { useState } from "react";
import moment from "moment"; // For formatting time ago

const Block = ({ block, onMine }) => {
  // State for tracking nonce values of each block
  const [nonce, setNonce] = useState(block.nonce);

  // Handler for changing nonce value
  const handleNonceChange = (e) => {
    setNonce(e.target.value);
  };

  return (
    <div
      data-block-number={`Block number: ${block.index}`}
      className="relative mt-20 bg-gradient-to-br from-blue-200 to-blue-400 text-gray-900 rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200 min-w-[300px] shadow-md before:content-[attr(data-block-number)] before:absolute before:top-[-2.5rem] before:left-0 before:right-0 before:text-center before:text-blue-950 before:rounded-md before:py-1 before:px-2 before:font-bold"
    >
      <div className="flex flex-col space-y-3 text-left">
        <div className="text-sm text-white font-semibold">
          <strong>Nonce:</strong>
          <input
            type="number"
            value={nonce}
            onChange={handleNonceChange}
            className="ml-2 bg-white text-gray-900 rounded-md px-2 py-1 focus:outline-none"
          />
        </div>
        <div className="text-sm text-white font-semibold">
          <strong>Transactions count:</strong> {block.transactions.length}
        </div>
        <div className="text-sm text-white font-semibold">
          <strong>Time Ago:</strong> {moment(block.timestamp).fromNow()}
        </div>
        <div className="text-sm flex text-white font-semibold relative group">
          <strong>Hash: </strong>
          <span className="truncate block hover:text-blue-600 cursor-pointer">
            {block.hash}
          </span>
          <div className="absolute -top-6 left-0 transform translate-y-full bg-blue-950 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max z-10 shadow-lg">
            {block.hash}
          </div>
        </div>
        <div className="text-sm flex text-white font-semibold relative group">
          <strong>Prevhash: </strong>
          <span className="truncate block hover:text-blue-600 cursor-pointer">
            {block.previousHash}
          </span>
          <div className="absolute -top-10 left-0 transform translate-y-full bg-blue-950 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max z-10 shadow-lg">
            {block.previousHash}
          </div>
        </div>
        <button
          onClick={() => onMine(index, nonce)}
          className="mt-3 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors duration-200"
        >
          Mine
        </button>
      </div>
    </div>
  );
};

export default Block;
