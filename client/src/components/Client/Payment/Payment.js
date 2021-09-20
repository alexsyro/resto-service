import React from 'react';

function Payment(props) {
  return (
    <>
      <form id="payment-form">
        <div id="card-container"></div>
        <button id="card-button" type="button">Pay $1.00</button>
      </form>
      <div id="payment-status-container"></div>
    </>
  );
}

export default Payment;
