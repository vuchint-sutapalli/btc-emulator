import { useState } from "react";

import "./App.css";
import Wallet from "./components/Wallet";
import WalletAndDashboard from "./components/WalletDashboard";

function App() {
  return (
    <>
      <h1>Vite + React</h1>
      {/* <Wallet /> */}
      <WalletAndDashboard />
    </>
  );
}

export default App;
