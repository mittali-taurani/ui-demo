import "./style.scss";
import React from "react";

const PaymentDetails: React.FC = () => {
    const currentDateTime: string[] = new Date().toLocaleString().split(",");
    return (
        <div className="product-details__main">
            <div className="product-name">
                <b>Product:</b> ABCD
        </div>
            <div className="purchase-date">
                <b>Date:</b> {currentDateTime[0].trim()}{" "}
                {currentDateTime[1].split(" ")[1].trim()}
            </div>
            <div className="product-price">
                <b>Amount:</b> 1123.03 USD
        </div>
        </div>
    );
};

export default PaymentDetails;