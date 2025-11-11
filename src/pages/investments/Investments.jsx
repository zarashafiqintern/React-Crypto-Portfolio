import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage"; 
import { useNavigate } from "react-router-dom";
import { STORAGE_KEYS } from "../../utils/storageKeys";
import { fetchPrice } from "../../utils/fetchPrice";
import { calculateInvestmentStats } from "../../utils/calculateInvestmentStats";
import Card from "./Card";
import "./investments.css";

const Investments = () => {
  const [investments] = useLocalStorage(STORAGE_KEYS.INVESTMENTS, []);
  const [updatedInvestments, setUpdatedInvestments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (investments.length > 0) fetchPrices(investments);
  }, [investments]);

  const fetchPrices = async (data) => {
    try {
      const updated = await Promise.all(
        data.map(async (inv) => {
          const symbol = inv.coin.toUpperCase() + "USDT";
          const currentPrice = await fetchPrice(symbol);
          const { invested, currentValue, totalPL, profitLoss } =
            calculateInvestmentStats(parseFloat(inv.quantity), parseFloat(inv.buyPrice), currentPrice);
          return { ...inv, currentPrice, invested, currentValue, profitLoss, absoluteProfitLoss: totalPL };
        })
      );
      setUpdatedInvestments(updated);
    } catch (err) {
      console.error("Error fetching Binance data:", err);
    }
  };

  const handleDelete = (coinName) => {
    const filtered = updatedInvestments.filter((inv) => inv.coin !== coinName);
    setUpdatedInvestments(filtered);
    localStorage.setItem(STORAGE_KEYS.INVESTMENTS, JSON.stringify(filtered));
  };

  const handleEdit = (coin) => navigate(`/investments/${coin}/edit`);

  return (
    <div className="investments-page">
      {updatedInvestments.length === 0 ? (
        <p>No investments found. Please add one!</p>
      ) : (
        updatedInvestments.map((inv, i) => (
          <Card key={i} investment={inv} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default Investments;
