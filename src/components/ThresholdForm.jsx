import React from "react";
import { useFormikContext } from "formik";
import "./ThresholdForm.css";

const ThresholdForm = () => {
  const { values, handleChange } = useFormikContext();
  const isDisabled = values.thresholdType === "none";

  return (
    <div className="threshold-container">
      <h3 className="threshold-title">Set Sell Threshold (Optional)</h3>

      <div className="threshold-options">
        <label>
          <input
            type="radio"
            name="thresholdType"
            value="none"
            checked={values.thresholdType === "none"}
            onChange={handleChange}
          />
          No Threshold
        </label>

        <label>
          <input
            type="radio"
            name="thresholdType"
            value="percentage"
            checked={values.thresholdType === "percentage"}
            onChange={handleChange}
          />
          Percentage (%)
        </label>

        <label>
          <input
            type="radio"
            name="thresholdType"
            value="target"
            checked={values.thresholdType === "target"}
            onChange={handleChange}
          />
          Target Price (USDT)
        </label>
      </div>

      <div className="threshold-inputs">
        <div className="input-group">
          <label>Profit Threshold</label>
          <input
            type="number"
            name="profitThreshold"
            placeholder="10"
            value={values.profitThreshold}
            onChange={handleChange}
            disabled={isDisabled}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Loss Threshold</label>
          <input
            type="number"
            name="lossThreshold"
            placeholder="-5"
            value={values.lossThreshold}
            onChange={handleChange}
            disabled={isDisabled}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};

export default ThresholdForm;
