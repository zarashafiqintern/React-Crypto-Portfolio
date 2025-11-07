export const calculateInvestmentStats = (quantity, buyPrice, currentPrice) => {
  const invested = quantity * buyPrice;
  const currentValue = quantity * currentPrice;
  const totalPL = currentValue - invested;
  const profitLoss = invested > 0 ? ((totalPL / invested) * 100).toFixed(2) : 0;

  return {
    invested,
    currentValue,
    totalPL,
    profitLoss,
  };
};
