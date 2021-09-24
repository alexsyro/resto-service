import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import styles from  "./Checkout.module.scss";

function Checkout() {
  const stripe = useStripe(); // hook for controlling stripe
  const elements = useElements(); // hook for elements

  // функция которая выполняется при нажатии на pay
  const pay = async () => {
    try {
      // запрос к серверу
      const response = await fetch("http://localhost:1234/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const cardElement = elements.getElement(CardElement);
      // делаем платеж, передаем все данные
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
