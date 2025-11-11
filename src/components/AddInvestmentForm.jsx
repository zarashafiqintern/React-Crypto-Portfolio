import React from "react";
import { Field, useFormikContext } from "formik";
import Select from "react-select";
import { coinOptions } from "../constants/coins"; 
import "./AddInvestmentForm.css";

const AddInvestmentForm = ({ selectedCoin }) => {
  const { values, setFieldValue } = useFormikContext();

  const selectedOption =
    coinOptions.find(
      (option) =>
        option.value.toLowerCase() ===
        (values.coin || selectedCoin || "").toLowerCase()
    ) || null;

  return (
    <div className="investment-form-container">
      <h2 className="form-title">Add Investment</h2>

      <div className="form-fields">
        <div className="form-group">
          <label>Coin Symbol</label>
          <Select
            options={coinOptions}
            placeholder="Type to search..."
            value={selectedOption}
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
      </div>
    </div>
  );
};

export default AddInvestmentForm;
