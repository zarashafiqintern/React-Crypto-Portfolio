// import React, { useEffect, useState } from "react";
// import "./investments.css";
// import { CRYPTO_API_URL, COIN_ID_MAP } from "../../config/apiConfig";
// import { useLocalStorage } from "../../Hooks/UseLocalStorage";

// const Investments = () => {
//   const [investments, setInvestments] = useLocalStorage("investments", []);
//   const [updatedInvestments, setUpdatedInvestments] = useState([]);

//   useEffect(() => {
//     if (investments.length > 0) fetchPrices(investments);
//   }, [investments]);

//   const fetchPrices = async (data) => {
//     try {
//       const ids = data
//         .map((inv) => COIN_ID_MAP[inv.coin.toUpperCase()])
//         .filter(Boolean)
//         .join(",");

//       const res = await fetch(`${CRYPTO_API_URL}?ids=${ids}&vs_currencies=usd`);
//       const apiData = await res.json();

//       const updated = data.map((inv) => {
//         const id = COIN_ID_MAP[inv.coin.toUpperCase()];
//         const currentPrice = apiData[id]?.usd || 0;

//         const quantity = parseFloat(inv.quantity);
//         const buyPrice = parseFloat(inv.buyPrice);
//         const invested = quantity * buyPrice;
//         const currentValue = quantity * currentPrice;
//         const profitLoss =
//           invested > 0
//             ? (((currentValue - invested) / invested) * 100).toFixed(2)
//             : 0;

//         return {
//           ...inv,
//           currentPrice,
//           invested,
//           currentValue,
//           profitLoss,
//         };
//       });

//       setUpdatedInvestments(updated);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//     }
//   };

//   return (
//     <div className="investments-page">
//       {updatedInvestments.length === 0 ? (
//         <p>No investments found. Please add one!</p>
//       ) : (
//         updatedInvestments.map((inv, i) => (
//           <div className="card" key={i}>
//             <h1>{inv.coin}</h1>
//             <div className="card-row"><strong>Quantity:</strong> {inv.quantity}</div>
//             <div className="card-row"><strong>Buy Price:</strong> ${inv.buyPrice}</div>
//             <div className="card-row"><strong>Current Price:</strong> ${inv.currentPrice}</div>
//             <div className="card-row"><strong>Invested:</strong> ${inv.invested.toLocaleString()}</div>
//             <div className="card-row"><strong>Current Value:</strong> ${inv.currentValue.toLocaleString()}</div>
//             <div className="card-row"><strong>Threshold:</strong> {inv.threshold}</div>
//             <div className="card-row"><strong>Purchase Date:</strong> {inv.date}, {inv.time}</div>
//             <br />
//             <strong>P/L:</strong>{" "}
//             <span style={{ color: inv.profitLoss >= 0 ? "limegreen" : "red" }}>
//               {inv.profitLoss}%
//             </span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Investments;















// import React, { useEffect, useState } from "react";
// import "./investments.css";
// import { useLocalStorage } from "../../Hooks/UseLocalStorage";

// const Investments = () => {
//   const [investments] = useLocalStorage("investments", []);
//   const [updatedInvestments, setUpdatedInvestments] = useState([]);

//   useEffect(() => {
//     if (investments.length > 0) fetchPrices(investments);
//   }, [investments]);

//   const fetchPrices = async (data) => {
//     try {
//       const updated = await Promise.all(
//         data.map(async (inv) => {
//           const symbol = inv.coin.toUpperCase();
//           const res = await fetch(
//             `${process.env.REACT_APP_BINANCE_URL}?symbol=${symbol}USDT`
//           );
//           const apiData = await res.json();

//           const currentPrice = parseFloat(apiData.price) || 0;
//           const quantity = parseFloat(inv.quantity);
//           const buyPrice = parseFloat(inv.buyPrice);
//           const invested = quantity * buyPrice;
//           const currentValue = quantity * currentPrice;
//           const profitLoss =
//             invested > 0
//               ? (((currentValue - invested) / invested) * 100).toFixed(2)
//               : 0;

//           return {
//             ...inv,
//             currentPrice,
//             invested,
//             currentValue,
//             profitLoss,
//           };
//         })
//       );

//       setUpdatedInvestments(updated);
//     } catch (err) {
//       console.error("Error fetching Binance data:", err);
//     }
//   };

//   return (
//     <div className="investments-page">
//       {updatedInvestments.length === 0 ? (
//         <p>No investments found. Please add one!</p>
//       ) : (
//         updatedInvestments.map((inv, i) => (
//           <div className="card" key={i}>
//             <h1>{inv.coin}</h1>
//             <div className="card-row"><strong>Quantity:</strong> {inv.quantity}</div>
//             <div className="card-row"><strong>Buy Price:</strong> ${inv.buyPrice}</div>
//             <div className="card-row"><strong>Current Price:</strong> ${inv.currentPrice}</div>
//             <div className="card-row"><strong>Invested:</strong> ${inv.invested.toLocaleString()}</div>
//             <div className="card-row"><strong>Current Value:</strong> ${inv.currentValue.toLocaleString()}</div>
//             <div className="card-row"><strong>Threshold:</strong> {inv.threshold}</div>
//             <div className="card-row"><strong>Purchase Date:</strong> {inv.date}, {inv.time}</div>
//             <br />
//             <strong>P/L:</strong>{" "}
//             <span style={{ color: inv.profitLoss >= 0 ? "limegreen" : "red" }}>
//               {inv.profitLoss}%
//             </span>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Investments;










import React, { useEffect, useState } from "react";
import "./investments.css";
import { useLocalStorage } from "../../Hooks/UseLocalStorage";

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
          // const url = `${process.env.REACT_APP_BINANCE_URL}?symbol=${symbol}`;
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

  return (
    <div className="investments-page">
      {updatedInvestments.length === 0 ? (
        <p>No investments found. Please add one!</p>
      ) : (
        updatedInvestments.map((inv, i) => (
          <div className="card" key={i}>
            <h1>{inv.coin}</h1>
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
