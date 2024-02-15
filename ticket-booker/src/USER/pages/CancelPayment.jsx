import React from "react";
import { useNavigate } from "react-router-dom";
import BasicExample from "../components/Header";

function CancelPayment() {
  const navigate = useNavigate();
  return (
    <>
      <BasicExample />

      <div className="d-flex flex-column mt-5 align-items-center justify-content-center">
        <h3 className="text-primary">Ooops!!! Transaction is failed!!!!!!</h3>
        <button onClick={navigate("/")} className="btn mt-4 btn-primary">
          Back to home
        </button>
      </div>
    </>
  );
}

export default CancelPayment;
