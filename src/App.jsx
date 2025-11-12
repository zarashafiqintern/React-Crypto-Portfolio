import { PortfolioProvider } from "./context/PortfolioContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/investments/Investments";
import EditInvestment from "./pages/EditInvestment/EditInvestment";
import CreateInvestment from "./pages/createinvestment/CreateInvestment";
import Layout from "./layout/Layout";
import "./App.css";

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
         
          <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="investments" element={<Investments />} />
            <Route path="investments/:id/edit" element={<EditInvestment />} />
            <Route path="investment/create" element={<CreateInvestment />} />
          </Route>
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
