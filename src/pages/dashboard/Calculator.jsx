import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Calculator.css";
import { X } from "lucide-react"; 

const Calculator = ({ onClose }) => {
  const [result, setResult] = useState(null);

  const validationSchema = Yup.object()
    .shape({
      numberOfCoins: Yup.number().required("Required").positive("Must be positive"),
      buyPrice: Yup.number().required("Required").positive("Must be positive"),
      pnlPercentage: Yup.number().nullable(),
      targetPrice: Yup.number().nullable(),
    })
    .test(
      "only-one",
      "Fill either P&L Percentage or Target Price (not both)",
      (values) => !(values.pnlPercentage && values.targetPrice)
    );

  const handleCalculate = (values) => {
    const { numberOfCoins, buyPrice, pnlPercentage, targetPrice } = values;
    const totalInvested = numberOfCoins * buyPrice;

    let calculatedTargetPrice = targetPrice;
    let calculatedPnlPercentage = pnlPercentage;

    if (!calculatedTargetPrice && calculatedPnlPercentage) {
      calculatedTargetPrice = buyPrice * (1 + calculatedPnlPercentage / 100);
    } else if (!calculatedPnlPercentage && calculatedTargetPrice) {
      calculatedPnlPercentage = ((calculatedTargetPrice - buyPrice) / buyPrice) * 100;
    }

    const finalValue = numberOfCoins * calculatedTargetPrice;
    const pnlAmount = finalValue - totalInvested;

    setResult({
      totalInvested: totalInvested.toFixed(2),
      targetPrice: calculatedTargetPrice.toFixed(2),
      pnlPercentage: calculatedPnlPercentage.toFixed(2),
      pnlAmount: pnlAmount.toFixed(2),
      finalValue: finalValue.toFixed(2),
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-icon" onClick={onClose}>
          <X size={30} />
        </button>

        <h3>P&L Calculator</h3>

        <Formik
          initialValues={{
            numberOfCoins: "",
            buyPrice: "",
            pnlPercentage: "",
            targetPrice: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleCalculate}
        >
          {({ isValid }) => (
            <Form className="form">
              <label>Number of Coins</label>
              <Field name="numberOfCoins" type="number" />
              <ErrorMessage name="numberOfCoins" component="div" className="error" />

              <label>Buy Price (USDT)</label>
              <Field name="buyPrice" type="number" />
              <ErrorMessage name="buyPrice" component="div" className="error" />

              <h4>Calculate By (Choose One)</h4>
              <label>P&L Percentage (%)</label>
              <Field name="pnlPercentage" type="number" />
              <ErrorMessage name="pnlPercentage" component="div" className="error" />

              <label>Target Price (USDT)</label>
              <Field name="targetPrice" type="number" />
              <ErrorMessage name="targetPrice" component="div" className="error" />

              <button type="submit" disabled={!isValid}>
                Calculate
              </button>
            </Form>
          )}
        </Formik>

        {result && (
          <div className="result-card">
            <h3>📊 Results</h3>
            <div className="grid">
              <div><p>Total Invested</p><h4>${result.totalInvested}</h4></div>
              <div><p>Target Price</p><h4>${result.targetPrice}</h4></div>
              <div><p>P&L Percentage</p><h4>+{result.pnlPercentage}%</h4></div>
              <div><p>P&L Amount</p><h4>+${result.pnlAmount}</h4></div>
            </div>
            <div className="final">
              <p>Final Value</p>
              <h3>${result.finalValue}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;
