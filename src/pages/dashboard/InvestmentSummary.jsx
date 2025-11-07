import React from "react";
import "./InvestmentSummary.css";

const InvestmentSummary = ({ totals }) => {
  const getProfitClass = (value) => {
    return value >= 0 ? "positive" : "negative";
  };

  return (
    <div className="summary-boxes">
      <div className="summary-card purple">
        <p>Total Invested</p>
        <h2>${totals.totalInvested.toLocaleString()}</h2>
      </div>

      <div className="summary-card purple">
        <p>Current Value</p>
        <h2>${totals.currentValue.toLocaleString()}</h2>
      </div>

      <div className={`summary-card purple ${getProfitClass(totals.totalPL)}`}>
        <p>Total P&L</p>
        <h2>
          {totals.totalPL >= 0 ? "+" : "-"}$
          {Math.abs(totals.totalPL).toLocaleString()}
        </h2>
      </div>

      <div
        className={`summary-card purple ${getProfitClass(totals.plPercentage)}`}
      >
        <p>P&L Percentage</p>
        <h2>{totals.plPercentage}%</h2>
      </div>
    </div>
  );
};

export default InvestmentSummary;
