import React, { useState } from 'react';
import './Dashboard.css';
import CreateInvestment from '../createinvestment/CreateInvestment';
import Calculator from './Calculator';
import ImportCV from './ImportCV';
import ExportCV from './ExportCV';

const Dashboard = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [portfolio, setPortfolio] = useState([]);

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
