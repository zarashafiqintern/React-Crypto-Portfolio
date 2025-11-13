import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddInvestmentForm from "../../components/AddInvestmentForm";
import ThresholdForm from "../../components/ThresholdForm";
import { useNavigate } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";
import "./CreateInvestment.css";

const CreateInvestment = () => {
  const navigate = useNavigate();
  const { addInvestment } = usePortfolio();

  const initialValues = {
    coin: "",
    quantity: "",
    buyPrice: "",
    date: "",
    time: "",
    thresholdType: "none",
    profitThreshold: "",
    lossThreshold: "",
  };

  const validationSchema = Yup.object({
    coin: Yup.string().required("Coin symbol required"),
    quantity: Yup.number().positive().required("Quantity required"),
    buyPrice: Yup.number().positive().required("Buy price required"),
    date: Yup.date().required("Purchase date required"),
    time: Yup.string().required("Purchase time required"),
  });

  const getThresholdText = (values) => {
    switch (values.thresholdType) {
      case "percentage":
        return `${values.profitThreshold}% / ${values.lossThreshold}%`;
      case "target":
        return `Target: ${values.profitThreshold}`;
      default:
        return "None";
    }
  };

  const handleSubmit = (values) => {
    const newInvestment = { ...values, threshold: getThresholdText(values) };
    addInvestment(newInvestment);
    navigate("/investments");
  };

  return (
    <div className="investment-form-page">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="investment-form">
          <AddInvestmentForm />
          <ThresholdForm />
          <button type="submit" className="add-btn">
            Add Investment
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateInvestment;
