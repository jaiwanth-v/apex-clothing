import React from "react";

import StripeCheckout from "react-stripe-checkout";
import { withRouter } from "react-router-dom";
import { clearCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const StripeCheckoutButton = ({ price, history, clearCart }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H7g9bJbp6bVVMFZonsR7h6tXMerETdICbQdxCf3JiMNmWo5kPtqLCPXWS94fKm1wtEsIrlVSVvsJXKRHSZkkL7e00jNxlLQAC";
  const alert = useAlert();
  const onToken = (token) => {
    history.push("/");
    clearCart();
    alert.success("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Apex Clothing Ltd."
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel=""
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(StripeCheckoutButton)
);
