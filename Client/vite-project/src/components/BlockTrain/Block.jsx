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
      data-block-number={`Block ${block.index}`}
      className="relative mt-20 bg-gradient-to-br from-indigo-400 to-blue-500 text-white rounded-lg p-6 border border-indigo-300 hover:shadow-xl transition-shadow duration-300 min-w-[300px] shadow-md before:content-[attr(data-block-number)] before:absolute before:top-[-2.5rem] before:left-0 before:right-0 before:text-center before:text-indigo-900 before:bg-indigo-200 before:rounded-t-md before:py-2 before:px-4 before:font-bold"
    >
      <div className="flex flex-col space-y-4">
        <div className="text-sm font-semibold">
          <strong>Nonce:</strong>
          <input
            type="number"
            value={nonce}
            onChange={handleNonceChange}
            className="ml-2 bg-white text-indigo-900 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
        <div className="text-sm font-semibold">
          <strong>Transactions:</strong> {block.transactions.length}
        </div>
        <div className="text-sm font-semibold">
          <strong>Time:</strong> {moment(block.timestamp).fromNow()}
        </div>
        <div className="text-sm font-semibold relative group">
          <strong>Hash: </strong>
          <span className="ml-1 truncate block hover:text-indigo-200 cursor-pointer">
            {block.hash}
          </span>
          <div className="absolute -top-6 left-0 transform translate-y-full bg-indigo-900 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max z-10 shadow-lg">
            {block.hash}
          </div>
        </div>
        <div className="text-sm font-semibold relative group">
          <strong>Prev Hash: </strong>
          <span className="ml-1 truncate block hover:text-indigo-200 cursor-pointer">
            {block.previousHash}
          </span>
          <div className="absolute -top-10 left-0 transform translate-y-full bg-indigo-900 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max z-10 shadow-lg">
            {block.previousHash}
          </div>
        </div>
        <button
          onClick={() => onMine(index, nonce)}
          className="mt-3 bg-[#B4D421] text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-800 transition-colors duration-200"
        >
          Mine
        </button>
      </div>
    </div>
  );
};

export default Block;
