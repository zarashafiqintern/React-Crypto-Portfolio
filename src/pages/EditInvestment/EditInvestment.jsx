import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import AddInvestmentForm from "../../components/AddInvestmentForm";
import ThresholdForm from "../../components/ThresholdForm";
import "./EditInvestment.css";

const EditInvestment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const investments = JSON.parse(localStorage.getItem("investments")) || [];

  const investment = investments.find(
    (inv) => inv.coin.toLowerCase() === id.toLowerCase()
  );

  if (!investment) {
    return <p>Investment not found!</p>;
  }

  const handleSubmit = (values) => {
    const updated = investments.map((inv) =>
      inv.coin.toLowerCase() === id.toLowerCase() ? values : inv
    );

    localStorage.setItem("investments", JSON.stringify(updated));
    navigate("/investments");
  };

  const handleCancel = () => {
    navigate("/investments");
  };

  return (
    <div className="edit-investment-page">
      <h2>Edit Investment - {investment.coin}</h2>

      <Formik
        initialValues={investment}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        <Form>
          <AddInvestmentForm selectedCoin={investment.coin} />
          <ThresholdForm />         
          <div className="butt-group">
            <button type="submt" className="save-butn">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-butn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default EditInvestment;
