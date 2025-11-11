import { PortfolioProvider } from "./context/PortfolioContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/investments/Investments";
import EditInvestment from "./pages/EditInvestment/EditInvestment";
import CreateInvestment from "./pages/createinvestment/CreateInvestment";
import "./App.css";

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Header
            icon="💰" 
            title="Crypto Portfolio Tracker"
            subtitle="Track your cryptocurrency investments with live Binance prices"
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/investments/:id/edit" element={<EditInvestment />} />
            <Route path="/investment/create" element={<CreateInvestment />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
