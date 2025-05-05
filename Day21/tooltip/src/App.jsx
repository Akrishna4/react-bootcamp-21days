import React from "react";
import "./App.css";
import Tooltip from "./components/Tooltip";

const App = () => {
  return (
    <div className="container">
      <Tooltip infoText="Your order will be placed after your payment is confirmed">
        <button className="btn">Pay Now</button>
      </Tooltip>
    </div>
  );
};

export default App;
