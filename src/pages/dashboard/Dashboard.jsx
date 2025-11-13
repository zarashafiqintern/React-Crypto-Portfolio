import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import CreateInvestment from "../createinvestment/CreateInvestment";
import Calculator from "./Calculator";
import ImportCV from "./ImportCV";
import ExportCV from "./ExportCV";
import InvestmentSummary from "./InvestmentSummary";
import { usePortfolio } from "../../context/PortfolioContext";
import { fetchPrice } from "../../utils/fetchPrice";
import { calculateInvestmentStats } from "../../utils/calculateInvestmentStats";

const Dashboard = () => {
  const { investments } = usePortfolio(); 
  const [showCreate, setShowCreate] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [portfolio, setPortfolio] = useState([]);
  const [totals, setTotals] = useState({
    totalInvested: 0,
    currentValue: 0,
    totalPL: 0,
    plPercentage: 0,
  });

  useEffect(() => {
    if (investments.length > 0) fetchPrices(investments);
    else
      setTotals({
        totalInvested: 0,
        currentValue: 0,
        totalPL: 0,
        plPercentage: 0,
      });
  }, [investments]);

  const fetchPrices = async (data) => {
    try {
      const updated = await Promise.all(
        data.map(async (inv) => {
          const symbol = inv.coin.toUpperCase() + "USDT";
          const currentPrice = await fetchPrice(symbol);

          const { invested, currentValue } = calculateInvestmentStats(
            parseFloat(inv.quantity),
            parseFloat(inv.buyPrice),
            currentPrice
          );

          return { invested, currentValue };
        })
      );

      const totalInvested = updated.reduce((acc, i) => acc + i.invested, 0);
      const currentValue = updated.reduce((acc, i) => acc + i.currentValue, 0);
      const totalPL = currentValue - totalInvested;
      const plPercentage =
        totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

      setTotals({
        totalInvested,
        currentValue,
        totalPL,
        plPercentage,
      });
    } catch (err) {
      console.error("Error fetching Binance data:", err);
    }
  };

  return (
    <>
      <div className="cont">
        <h2>Your Portfolio</h2>

        <div className="button-gro">
          <button className="button" onClick={() => setShowCreate(true)}>
            ➕ Create
          </button>

          <button className="button" onClick={() => setShowCalculator(true)}>
            🧮 Calculator
          </button>

          <ImportCV portfolio={portfolio} setPortfolio={setPortfolio} />
          <ExportCV portfolio={portfolio} />
        </div>
      </div>

      <InvestmentSummary totals={totals} />

      {showCreate && (
        <div className="create-container">
          <CreateInvestment />
        </div>
      )}

      {showCalculator && (
        <div className="calculator-container">
          <Calculator onClose={() => setShowCalculator(false)} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
