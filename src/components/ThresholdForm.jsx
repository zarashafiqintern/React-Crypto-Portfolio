import React from "react";
import { useFormikContext, Field } from "formik";
import "./ThresholdForm.css";

const ThresholdForm = () => {
  const { values } = useFormikContext();
  const isDisabled = values.thresholdType === "none";

  return (
    <div className="threshold-container">
      <h3 className="threshold-title">Set Sell Threshold (Optional)</h3>

      <div className="threshold-options">
        <label>
          <Field type="radio" name="thresholdType" value="none" />
          No Threshold
        </label>

        <label>
          <Field type="radio" name="thresholdType" value="percentage" />
          Percentage (%)
        </label>

        <label>
          <Field type="radio" name="thresholdType" value="target" />
          Target Price (USDT)
        </label>
      </div>

      <div className="threshold-inputs">
        <div className="input-group">
          <label>Profit Threshold</label>
          <Field
            type="number"
            name="profitThreshold"
            placeholder="10"
            disabled={isDisabled}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label>Loss Threshold</label>
          <Field
            type="number"
            name="lossThreshold"
            placeholder="-5"
            disabled={isDisabled}
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
};

export default ThresholdForm;
