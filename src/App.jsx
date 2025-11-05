import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddInvestmentForm from "./components/AddInvestmentForm";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/Investments";
import Investment from "./pages/Investment";
import EditInvestment from "./pages/EditInvestment";
import CreateInvestment from "./pages/CreateInvestment";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
         <AddInvestmentForm />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/editinvestment" element={<EditInvestment />} />
          <Route path="/createinvestment" element={<CreateInvestment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
