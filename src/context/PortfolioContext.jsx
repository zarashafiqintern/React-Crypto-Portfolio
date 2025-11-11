import React, { createContext, useContext, useEffect, useState } from "react";

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [investments, setInvestments] = useState(() => {
    const saved = localStorage.getItem("investments");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("investments", JSON.stringify(investments));
  }, [investments]);

  const addInvestment = (newInvestment) => {
    setInvestments((prev) => [...prev, newInvestment]);
  };

  const updateInvestment = (updated) => {
    setInvestments((prev) =>
      prev.map((inv) =>
        inv.coin.toLowerCase() === updated.coin.toLowerCase() ? updated : inv
      )
    );
  };

  const deleteInvestment = (coin) => {
    setInvestments((prev) => prev.filter((inv) => inv.coin !== coin));
  };

  return (
    <PortfolioContext.Provider
      value={{ investments, addInvestment, updateInvestment, deleteInvestment }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
