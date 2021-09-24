import React from 'react';
import  styles from "./Payment.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./Checkout/Checkout";

// передаем сюда публичный клюс который берем из кабинета разработчика
const stripePromise = loadStripe("pk_test_51Jcz9sLTKBoxXCLRX4WDcZU7uq2oOx7qUmRISsN7Pd0j8Rmhn6i3Rh3CIlauVPWnYzcWIzeJvJHMYdqTgxQBraLo00iKViXBYU");

function Payment(props) {
  return (
    <>
      <div className={styles.app}>
    <Elements stripe={stripePromise}>
      <Checkout />
    </Elements>
  </div>
    </>
  );
}

export default Payment;
