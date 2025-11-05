import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import AddInvestmentForm from "../../components/AddInvestmentForm";
import ThresholdForm from "../../components/ThresholdForm";
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
    console.log("All Form Data:", values);
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
