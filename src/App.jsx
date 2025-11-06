import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Investments from "./pages/investments/Investments";
import Investment from "./pages/Investment";
import EditInvestment from "./pages/EditInvestment";
import CreateInvestment from "./pages/createinvestment/CreateInvestment"; 
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Header />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/investments/:id" element={<Investment />} />
          <Route path="/investments/:id/edit" element={<EditInvestment />} />
          <Route path="/investment/create" element={<CreateInvestment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
