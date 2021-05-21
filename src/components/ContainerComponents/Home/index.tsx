import "./style.scss";
import React from "react";
import PaymentDetails from "../../DesignComponents/PaymentDetails";
import PaymentForm from "../PaymentForm";

const Home: React.FC = () => (
  <div className="payment__main">
    <PaymentDetails />
    <PaymentForm />
  </div>
);

export default Home;
