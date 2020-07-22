import React from "react";

import StripeCheckout from "react-stripe-checkout";

export const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H7g9bJbp6bVVMFZonsR7h6tXMerETdICbQdxCf3JiMNmWo5kPtqLCPXWS94fKm1wtEsIrlVSVvsJXKRHSZkkL7e00jNxlLQAC";
  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="Apex Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};
