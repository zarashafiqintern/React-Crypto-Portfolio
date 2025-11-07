export const fetchPrice = async (symbol) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BINANCE_URL}?symbol=${symbol}`);
    const data = await res.json();
    return parseFloat(data.price) || 0;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return 0;
  }
};
