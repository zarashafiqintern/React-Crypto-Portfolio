import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

  return (
    <div>
      <h2>Add New Investment</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {/* Coin Symbol */}
          <div>
            <label>Coin Symbol</label>
            <Field type="text" name="coin" placeholder="e.g. BTC" />
            <ErrorMessage name="coin" component="p" />
          </div>

          {/* Quantity */}
          <div>
            <label>Quantity</label>
            <Field type="number" name="quantity" placeholder="0.5" />
            <ErrorMessage name="quantity" component="p" />
          </div>

          {/* Buy Price */}
          <div>
            <label>Buy Price (USDT)</label>
            <Field type="number" name="buyPrice" placeholder="45000" />
            <ErrorMessage name="buyPrice" component="p" />
          </div>

          {/* Purchase Date */}
          <div>
            <label>Purchase Date</label>
            <Field type="date" name="date" />
            <ErrorMessage name="date" component="p" />
          </div>

          {/* Purchase Time */}
          <div>
            <label>Purchase Time</label>
            <Field type="time" name="time" />
            <ErrorMessage name="time" component="p" />
          </div>

          <button type="submit">Add Investment</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddInvestmentForm;
