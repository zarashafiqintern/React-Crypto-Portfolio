import React, { useEffect, useState } from "react";
import "./investments.css";
import { useLocalStorage } from "../../Hooks/UseLocalStorage";
import { FaEdit } from "react-icons/fa";
import DeleteButton from "../../components/DeleteButton";
import { useNavigate } from "react-router-dom"; 

const Investments = () => {
  const [investments] = useLocalStorage("investments", []);
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
          const url = `${import.meta.env.VITE_BINANCE_URL}?symbol=${symbol}`;
          const res = await fetch(url);
          const apiData = await res.json();

          const currentPrice = parseFloat(apiData.price) || 0;
          const quantity = parseFloat(inv.quantity);
          const buyPrice = parseFloat(inv.buyPrice);
          const invested = quantity * buyPrice;
          const currentValue = quantity * currentPrice;

          const profitLoss =
            invested > 0
              ? (((currentValue - invested) / invested) * 100).toFixed(2)
              : 0;

          const absoluteProfitLoss = currentValue - invested;

          return {
            ...inv,
            currentPrice,
            invested,
            currentValue,
            profitLoss,
            absoluteProfitLoss,
          };
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
    localStorage.setItem("investments", JSON.stringify(filtered));
  };

  const handleEdit = (coin) => {
    navigate(`/investments/${coin}/edit`);
  };

  return (
    <div className="investments-page">
      {updatedInvestments.length === 0 ? (
        <p>No investments found. Please add one!</p>
      ) : (
        updatedInvestments.map((inv, i) => (
          <div className="card" key={i}>
            <div className="card-header">
              <h1>{inv.coin}</h1>
              <div className="icons">
                <FaEdit
                  className="edit-icon"
                  title="Edit investment"
                  onClick={() => handleEdit(inv.coin)}
                />
                <DeleteButton onDelete={() => handleDelete(inv.coin)} />
              </div>
            </div>

            <div className="card-row">
              <strong>Quantity:</strong> {inv.quantity}
            </div>
            <div className="card-row">
              <strong>Buy Price:</strong> ${inv.buyPrice}
            </div>
            <div className="card-row">
              <strong>Current Price:</strong> ${inv.currentPrice}
            </div>
            <div className="card-row">
              <strong>Invested:</strong> ${inv.invested.toLocaleString()}
            </div>
            <div className="card-row">
              <strong>Current Value:</strong> ${inv.currentValue.toLocaleString()}
            </div>

            <div className="card-row">
              <strong>Threshold:</strong>{" "}
              {inv.thresholdType === "percentage"
                ? `Percentage (${inv.profitThreshold || "N/A"}%)`
                : inv.thresholdType === "target"
                ? `Target Price (${inv.profitThreshold || "N/A"} USDT)`
                : "None"}
            </div>

            <div className="card-row">
              <strong>Purchase Date:</strong> {inv.date}, {inv.time}
            </div>

            <br />

            <div className="card-row">
              <strong>Profit/Loss:</strong>{" "}
              <span style={{ color: inv.absoluteProfitLoss >= 0 ? "limegreen" : "red" }}>
                ${inv.absoluteProfitLoss.toFixed(2)}
              </span>
            </div>

            <div className="card-row">
              <strong>P/L %:</strong>{" "}
              <span style={{ color: inv.profitLoss >= 0 ? "limegreen" : "red" }}>
                {inv.profitLoss}%
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Investments;
