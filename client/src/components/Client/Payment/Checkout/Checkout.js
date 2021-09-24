import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { clearReservationAC } from '../../../../redux/actionCreators/actionCreators';
import { cartCleanAC } from '../../../../redux/actionCreators/cartAC';
import styles from './Checkout.module.scss';

const { REACT_APP_URL } = process.env;

function Checkout() {
  const history = useHistory();
  const stripe = useStripe(); // hook for controlling stripe
  const elements = useElements(); // hook for elements
  const dispatch = useDispatch();
  const { reservation } = useSelector((state) => state.reservationReducer);
  const { cart, total } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.usersReducer);

  // функция которая выполняется при нажатии на pay
  const pay = async () => {
    try {
      // запрос к серверу
      const response = await fetch(`${REACT_APP_URL}pay`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ amount: total }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const cardElement = elements.getElement(CardElement);
      // делаем платеж, передаем все данные
      const confirmPayment = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });
      console.log(confirmPayment);
      const { paymentIntent } = confirmPayment;
      if (paymentIntent.status === 'succeeded') {
        alert(`Payment successful!`);

        console.log(reservation);
        const orderData = { user, cart, reservation, StateId: 3 };
        console.log('ORDEEEER', orderData);
        const response = await fetch(`${REACT_APP_URL}api/orders`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: orderData }),
        });
        if (response.status === 200) {
          dispatch(clearReservationAC());
          dispatch(cartCleanAC());
          alert('Заказ оформлен, ожидайте подтверждения');
          history.push('/cart');
        } else {
          alert('Ой, кажется что-то пошло не так.');
        }
      } else alert(`Payment failed!`);
    } catch (err) {
      console.error(err);
      alert('There was an error in payment');
    }
  };

  return (
    <div className={styles.checkout} style={{ width: '25%' }}>
      <CardElement />
      <button className={styles.pay} onClick={pay}>Pay</button>
    </div>
  );
}

export default Checkout;
