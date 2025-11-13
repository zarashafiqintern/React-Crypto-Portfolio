import React, { useMemo } from "react";
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

  const coinMap = useMemo(
    () => new Map(coinOptions.map(option => [option.value.toLowerCase(), option])),
    []
  );

  const selectedOption = coinMap.get(currentCoin) || null;

  const fieldConfigs = [
    { label: "Quantity", type: "number", name: "quantity", placeholder: "0.5" },
    { label: "Buy Price (USDT)", type: "number", name: "buyPrice", placeholder: "45000" },
    { label: "Purchase Date", type: "date", name: "date" },
    { label: "Purchase Time", type: "time", name: "time" },
  ];

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

        {fieldConfigs.map((field) => (
          <FormField key={field.name} {...field} />
        ))}
      </div>
    </div>
  );
};

export default AddInvestmentForm;
