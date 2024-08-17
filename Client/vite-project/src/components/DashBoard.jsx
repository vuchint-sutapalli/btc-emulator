import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BlockchainDashboard = ({
  chainInfo,
  latestBlocks,
  latestTransactions,
  isLoading,
}) => {
  if (isLoading) {
    return <div className="text-center mt-8">Loading dashboard...</div>;
  }

  if (!chainInfo) {
    return (
      <div className="text-center mt-8">
        Unable to load blockchain information.
      </div>
    );
  }

  const blockSizeData = latestBlocks.map((block) => ({
    blockNumber: block.index,
    size: block.transactions.length,
  }));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blockchain Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Blocks" value={chainInfo.totalBlocks} />
        <StatCard
          title="Total Transactions"
          value={chainInfo.totalTransactions}
        />
        <StatCard
          title="Current Difficulty"
          value={chainInfo.currentDifficulty}
        />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Latest Blocks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Block #</th>
                <th className="px-4 py-2">Hash</th>
                <th className="px-4 py-2">Transactions</th>
                <th className="px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {latestBlocks.map((block) => (
                <tr key={block.index}>
                  <td className="border px-4 py-2">{block.index}</td>
                  <td className="border px-4 py-2">
                    {block.hash.substring(0, 10)}...
                  </td>
                  <td className="border px-4 py-2">
                    {block.transactions.length}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(block.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Latest Transactions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {latestTransactions.map((tx, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {tx.fromAddress.substring(0, 10)}...
                  </td>
                  <td className="border px-4 py-2">
                    {tx.toAddress.substring(0, 10)}...
                  </td>
                  <td className="border px-4 py-2">{tx.amount} BTC</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-2">Block Size (Last 5 Blocks)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={blockSizeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="blockNumber" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="size" fill="#8884d8" name="Transactions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default BlockchainDashboard;
