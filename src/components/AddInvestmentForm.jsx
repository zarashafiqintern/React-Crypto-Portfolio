import React from "react";
import { Field, useFormikContext } from "formik";
import Select from "react-select";
import { coinOptions } from "../constants/coins"; 
import "./AddInvestmentForm.css";

const FormField = ({ label, ...props }) => (
  <div className="form-group">
    <label>{label}</label>
    <Field className="input-field" {...props} />
  </div>
);

const AddInvestmentForm = ({ selectedCoin }) => {
  const { values, setFieldValue } = useFormikContext();

  const currentCoin = (values.coin || selectedCoin || "").toLowerCase();

  const selectedOption = coinOptions.find(
    (option) => option.value.toLowerCase() === currentCoin
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

        <FormField label="Quantity" type="number" name="quantity" placeholder="0.5" />
        <FormField label="Buy Price (USDT)" type="number" name="buyPrice" placeholder="45000" />
        <FormField label="Purchase Date" type="date" name="date" />
        <FormField label="Purchase Time" type="time" name="time" />
      </div>
    </div>
  );
};

export default AddInvestmentForm;
