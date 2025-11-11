import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import { fetchPrice } from "../../utils/fetchPrice";
import { calculateInvestmentStats } from "../../utils/calculateInvestmentStats";
import Card from "./Card";
import "./investments.css";

const Investments = () => {
  const { investments, deleteInvestment } = usePortfolio();
  const [updatedInvestments, setUpdatedInvestments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (investments.length > 0) fetchPrices(investments);
  }, [investments]);

  const fetchPrices = async (data) => {
    const updated = await Promise.all(
      data.map(async (inv) => {
        const symbol = inv.coin.toUpperCase() + "USDT";
        const currentPrice = await fetchPrice(symbol);
        const { invested, currentValue, totalPL, profitLoss } =
          calculateInvestmentStats(
            parseFloat(inv.quantity),
            parseFloat(inv.buyPrice),
            currentPrice
          );
        return {
          ...inv,
          currentPrice,
          invested,
          currentValue,
          profitLoss,
          absoluteProfitLoss: totalPL,
        };
      })
    );
    setUpdatedInvestments(updated);
  };

  const handleEdit = (coin) => navigate(`/investments/${coin}/edit`);
  const handleDelete = (coin) => deleteInvestment(coin);

  return (
    <div className="investments-page">
      {updatedInvestments.length === 0 ? (
        <p>No investments found. Please add one!</p>
      ) : (
        updatedInvestments.map((inv, i) => (
          <Card
            key={i}
            investment={inv}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default Investments;
