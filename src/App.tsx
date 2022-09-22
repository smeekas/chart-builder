import React from "react";
import "./App.css";
import { Chart } from "./components/Chart/Chart";
import ToolBar from "./components/ToolBar/ToolBar";

function App() {
  return (
    <div className="App">
      <ToolBar />
      <Chart />
    </div>
  );
}

export default App;
