import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Layers, Clock, Hash, Database } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import useBlockChainData from "../../hooks/useBlockChainData";

const RecentBlocks = () => {
  const { recentBlocks } = useBlockChainData();

  if (!recentBlocks) {
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

  const chartData = recentBlocks.map((block) => ({
    height: block.index,
    transactions: block.transactions.length,
  }));

  return (
    <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex items-center">
          <Layers className="mr-2" /> Last 5 Blocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="height" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  border: "none",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="transactions" fill="#4ade80" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4">
          {recentBlocks.map((block, index) => (
            <Card key={block.hash} className="bg-white bg-opacity-20">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold flex items-center">
                    <Database className="mr-2" /> Block {block.index}
                  </span>
                  <span className="text-sm flex items-center">
                    <Clock className="mr-1" />
                    {new Date(block.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-sm truncate">
                  <Hash className="inline mr-1" /> {block.hash}
                </div>
                <div className="mt-2 text-right">
                  Transactions: {block.transactions.length}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentBlocks;
