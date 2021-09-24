import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import styles from  "./Checkout.module.scss";

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();

  const pay = async () => {
    try {
      const response = await fetch("http://localhost:1234/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const cardElement = elements.getElement(CardElement);
      const confirmPayment = await stripe.confirmCardPayment(
        data.clientSecret,
        { payment_method: { card: cardElement } }
      );
      console.log(confirmPayment);
      const { paymentIntent } = confirmPayment;
      if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
      else alert(`Payment failed!`);
    } catch (err) {
      console.error(err);
      alert("There was an error in payment");
    }
  };

  return (
    <div className={styles.checkout} style={{ width: "25%" }}>
      <CardElement />
      <button onClick={pay}>Pay</button>
    </div>
  );
}

export default Checkout;
