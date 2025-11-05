import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import "./AddInvestmentForm.css";

const AddInvestmentForm = () => {
  const initialValues = {
    coin: "",
    quantity: "",
    buyPrice: "",
    date: "",
    time: "",
  };

  const validationSchema = Yup.object({
    coin: Yup.string().required("Coin symbol required"),
    quantity: Yup.number().positive().required("Quantity required"),
    buyPrice: Yup.number().positive().required("Buy price required"),
    date: Yup.date().required("Purchase date required"),
    time: Yup.string().required("Purchase time required"),
  });

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    alert("Investment added successfully!");
  };

  const coinOptions = [
    { value: "BTC", label: "BTC - Bitcoin" },
    { value: "ETH", label: "ETH - Ethereum" },
    { value: "BNB", label: "BNB - Binance Coin" },
    { value: "XRP", label: "XRP - Ripple" },
    { value: "ADA", label: "ADA - Cardano" },
    { value: "DOGE", label: "DOGE - Dogecoin" },
    { value: "SOL", label: "SOL - Solana" },
    { value: "TRX", label: "TRX - Tron" },
    { value: "DOT", label: "DOT - Polkadot" },
    { value: "MATIC", label: "MATIC - Polygon" },
    { value: "LTC", label: "LTC - Litecoin" },
    { value: "SHIB", label: "SHIB - Shiba Inu" },
    { value: "AVAX", label: "AVAX - Avalanche" },
    { value: "UNI", label: "UNI - Uniswap" },
    { value: "LINK", label: "LINK - Chainlink" },
    { value: "ATOM", label: "ATOM - Cosmos" },
    { value: "XLM", label: "XLM - Stellar" },
    { value: "NEAR", label: "NEAR - Near Protocol" },
    { value: "ALGO", label: "ALGO - Algorand" },
    { value: "VET", label: "VET - VeChain" },
    { value: "FIL", label: "FIL - Filecoin" },
    { value: "HBAR", label: "HBAR - Hedera" },
    { value: "APT", label: "APT - Aptos" },
    { value: "ARB", label: "ARB - Arbitrum" },
    { value: "OP", label: "OP - Optimism" },
    { value: "ASTER", label: "ASTER - Aster" },
  ];

  return (
    <div className="investment-form-container">
      <h2 className="form-title">Add New Investment</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="investment-form">
            <div className="form-group">
              <label>Coin Symbol</label>
              <Select
                options={coinOptions}
                placeholder="Type to search..."
                onChange={(option) => setFieldValue("coin", option.value)}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <Field
                type="number"
                name="quantity"
                placeholder="0.5"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Buy Price (USDT)</label>
              <Field
                type="number"
                name="buyPrice"
                placeholder="45000"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label>Purchase Date</label>
              <Field type="date" name="date" className="input-field" />
            </div>

            <div className="form-group">
              <label>Purchase Time</label>
              <Field type="time" name="time" className="input-field" />
            </div>

            <button type="submit" className="submit-btn">
              Add Investment
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddInvestmentForm;
