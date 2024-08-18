import { useState } from "react";

import "./App.css";
// import Wallet from "./components/Wallet";
import WalletAndDashboard from "./components/WalletDashboard";
import { BlockChainProvider } from "./contexts/BlockChainContext";

function App() {
  return (
    <BlockChainProvider>
      <WalletAndDashboard />
    </BlockChainProvider>
  );
}

export default App;
