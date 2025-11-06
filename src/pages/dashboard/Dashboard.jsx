import React from 'react';
import './Dashboard.css';
import { useState } from "react";
import CreateInvestment from '../createinvestment/CreateInvestment';

const Dashboard = () => {
  const [showCreate, setShowCreate] = useState(false);
 
  return (
    <>
      <div className="cont">
        <h2>Your Portfolio</h2>
        <button
          className="button"
          onClick={() => setShowCreate(true)}
        >
          Create
        </button>
      </div>
      {showCreate && (
        <div className="create-container">
          <CreateInvestment />
        </div>
      )}
    </>
  );
};
export default Dashboard;
