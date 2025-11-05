import React from "react";
import AddInvestmentForm from "./components/AddInvestmentForm";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
      <div className="app-container">
        <Header />
        <AddInvestmentForm />
      </div>
  );
}

export default App;
