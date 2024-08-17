// StatCard.js
import React from "react";

const StatCard = ({ title, value }) => (
  <div className="bg-gray-50 p-4 shadow rounded-lg text-center">
    <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

export default StatCard;
