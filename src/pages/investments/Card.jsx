import React from "react";
import { FaEdit } from "react-icons/fa";
import DeleteButton from "../../components/DeleteButton";
const Card = ({ investment, onEdit, onDelete }) => {
  const {
    coin,
    quantity,
    buyPrice,
    currentPrice,
    invested,
    currentValue,
    thresholdType,
    profitThreshold,
    date,
    time,
    absoluteProfitLoss,
    profitLoss,
  } = investment;

  const renderThreshold = () => {
    if (thresholdType === "percentage") return `Percentage (${profitThreshold || "N/A"}%)`;
    if (thresholdType === "target") return `Target Price (${profitThreshold || "N/A"} USDT)`;
    return "None";
  };

  return (
    <div className="card">
      <div className="card-header">
        <h1>{coin}</h1>
        <div className="icons">
          <FaEdit className="edit-icon" title="Edit investment" onClick={() => onEdit(coin)} />
          <DeleteButton onDelete={() => onDelete(coin)} />
        </div>
      </div>

      <div className="card-row"><strong>Quantity:</strong> {quantity}</div>
      <div className="card-row"><strong>Buy Price:</strong> ${buyPrice}</div>
      <div className="card-row"><strong>Current Price:</strong> ${currentPrice}</div>
      <div className="card-row"><strong>Invested:</strong> ${invested.toLocaleString()}</div>
      <div className="card-row"><strong>Current Value:</strong> ${currentValue.toLocaleString()}</div>
      <div className="card-row"><strong>Threshold:</strong> {renderThreshold()}</div>
      <div className="card-row"><strong>Purchase Date:</strong> {date}, {time}</div>

      <br />

      <div className={`card-row ${absoluteProfitLoss >= 0 ? "profit-positive" : "profit-negative"}`}>
        <strong>Profit/Loss:</strong> ${absoluteProfitLoss.toFixed(2)}
      </div>

      <div className={`card-row ${profitLoss >= 0 ? "profit-positive" : "profit-negative"}`}>
        <strong>P/L %:</strong> {profitLoss}%
      </div>
    </div>
  );
};

export default Card;
