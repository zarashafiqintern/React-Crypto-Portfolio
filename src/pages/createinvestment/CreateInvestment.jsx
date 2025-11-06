import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddInvestmentForm from "../../components/AddInvestmentForm";
import ThresholdForm from "../../components/ThresholdForm";
import "./CreateInvestment.css";

const CreateInvestment = () => {
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

  const handleSubmit = (values) => {
    const savedInvestments =
      JSON.parse(localStorage.getItem("investments")) || [];

    const newInvestment = {
      ...values,
      threshold:
        values.thresholdType === "percentage"
          ? `+${values.profitThreshold}% / ${values.lossThreshold}%`
          : values.thresholdType === "target"
          ? `Target: ${values.profitThreshold}`
          : "None",
    };

    localStorage.setItem(
      "investments",
      JSON.stringify([...savedInvestments, newInvestment])
    );

    alert("Investment added successfully!");
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
