import React, { useEffect, useState } from "react";
import "./investments.css";
import { useLocalStorage } from "../../Hooks/UseLocalStorage";
import { FaEdit } from "react-icons/fa";
import DeleteButton from "../../components/DeleteButton";

const Investments = () => {
  const [investments] = useLocalStorage("investments", []);
  const [updatedInvestments, setUpdatedInvestments] = useState([]);

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

          return {
            ...inv,
            currentPrice,
            invested,
            currentValue,
            profitLoss,
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
                <FaEdit className="edit-icon" title="Edit investment" />
                <DeleteButton onDelete={() => handleDelete(inv.coin)} />
              </div>
            </div>

            <div className="card-row"><strong>Quantity:</strong> {inv.quantity}</div>
            <div className="card-row"><strong>Buy Price:</strong> ${inv.buyPrice}</div>
            <div className="card-row"><strong>Current Price:</strong> ${inv.currentPrice}</div>
            <div className="card-row"><strong>Invested:</strong> ${inv.invested.toLocaleString()}</div>
            <div className="card-row"><strong>Current Value:</strong> ${inv.currentValue.toLocaleString()}</div>
            <div className="card-row"><strong>Threshold:</strong> {inv.threshold}</div>
            <div className="card-row"><strong>Purchase Date:</strong> {inv.date}, {inv.time}</div>
            <br />
            <strong>P/L:</strong>{" "}
            <span style={{ color: inv.profitLoss >= 0 ? "limegreen" : "red" }}>
              {inv.profitLoss}%
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Investments;
