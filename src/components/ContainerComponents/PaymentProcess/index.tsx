import "./style.scss";
import React, { useState, useEffect } from "react";
import PaymentDetails from "../../DesignComponents/PaymentDetails";
import {
  PAYMENT_SUCCESS_URL,
  PAYMENT_FAILED_URL,
} from "../../../helper/constants";

const PaymentProcess: React.FC = () => {
  const [fetchError, setFetchError] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [successResponseMessage, setSuccessResponseMessage] = useState("");

  const fetchCardTypes = async () => {
    setFetchError("");
    try {
      const response = await fetch(PAYMENT_SUCCESS_URL);
      const data = await response.json();
      const { invoiceNo, responseMessage } = data;
      setInvoiceNumber(invoiceNo);
      setSuccessResponseMessage(responseMessage);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchFailRequest = async () => {
    setInvoiceNumber("");
    try {
      const response = await fetch(PAYMENT_FAILED_URL);
      const data = await response.json();
      setFetchError(data.responseMessage);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCardTypes();
    // fetchFailRequest();
  }, []);

  return (
    <div className="payment-process__main">
      <PaymentDetails />
      <div className="payment-result__div">
        <div>
          {invoiceNumber
            ? "Your payment has been successfully processed"
            : "Your payment has been declined"}
        </div>
        {invoiceNumber && (
          <div className="payment-success__div">
            <h4 className="response-message">{successResponseMessage}</h4>
            Invoice No: {invoiceNumber}
          </div>
        )}
        {fetchError && <h4 className="payment-fail__div">{fetchError}</h4>}
      </div>
    </div>
  );
};

export default PaymentProcess;
