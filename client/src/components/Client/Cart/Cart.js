import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearReservationAC } from '../../../redux/actionCreators/actionCreators';
import { cartCleanAC } from '../../../redux/actionCreators/cartAC';
import CartPosition from './CartPosition';
import styles from './Cart.module.scss';

const TYPE_PREORDER = 5;
const TYPE_DELIVERY = 4;

export default function Cart() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const { reservation } = useSelector((state) => state.reservationReducer);

  const [fullPrice, setFullPrice] = useState(0);
  const [orderType, setOrderType] = useState(TYPE_PREORDER);

  console.log('orderType', orderType);

  function checkOrderPossibility() {
    const isPreOrder = orderType === TYPE_PREORDER;
    const haveReservations = reservation !== null;
    console.log('ASd', isPreOrder, haveReservations, isPreOrder + haveReservations === 2);
    return isPreOrder + haveReservations === 2;
  }

  const orderTypeHandler = (event) => {
    console.log('EVENT', event);
    if (event.target.id === 'preorder') {
      setOrderType(TYPE_PREORDER);
    } else if (event.target.id === 'delivery') {
      setOrderType(TYPE_DELIVERY);
    }
  };

  const makeOrder = async (event) => {
    event.preventDefault();
    console.log(reservation);
    const orderData = { user, cart, reservation, StateId: orderType };
    console.log('ORDEEEER', orderData);
    const response = await fetch('http://localhost:1234/api/orders', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order: orderData }),
    });
    if (response.status === 200) {
      dispatch(clearReservationAC());
      dispatch(cartCleanAC());
    }
    //   Фетч на бек с резервированием (создаётся в базе первым) и содержимым корзины(создаётся после создания заказа)
    //   Содержимое в виде
    //   {
    //     orders:
    //     {
    //       'PositionId': 'id',
    //       'quanity': 'Number',
    //     },
    //     reservation: 'from reservationReducer',
    //     user: 'from userReducer'
    // }
  };

  useEffect(() => {
    // Меняем общую сумму, если поменялось количество
    console.log('CAAART REDUCE', cart);
    const price = cart.reduce((acc, position) => acc + Number(position.price) * Number(position.quantity), 0);
    setFullPrice(price - (price * user.discount) / 100);
  }, [cart]);

  const total = useSelector((state) => state.cartReducer.cart);
  console.log(total, 'TOTAL');

  if (cart?.length) {
    return (
      <form className={styles.form} onSubmit={makeOrder}>
        <h3 className={styles.order}>Корзина</h3>
        <h4 >Ваш заказ:</h4>
        <table className={styles.table}>
          <thead className={styles.table_nav}>
            <tr className={styles.table_cell}>
              <td className={styles.cell}>Название</td>
              <td>Количество</td>
              <td>Удалить</td>
              <td>Цена</td>
              <td>Всего</td>
            </tr>
          </thead>
          <tbody>
            {cart.map((position) => (
              <CartPosition key={position.id} position={position} />
            ))}
          </tbody>
        </table>
        <h4>Выберете тип заказа:</h4>
        <div className={styles.inputs}>

          <input
            onChange={orderTypeHandler}
            type='checkbox'
            id='delivery'
            checked={orderType === TYPE_DELIVERY}
          />
          <label className={styles.input} htmlFor='scales'>Доставка</label>
          <input
            onChange={orderTypeHandler}
            type='checkbox'
            id='preorder'
            checked={orderType === TYPE_PREORDER}
          />
          <label htmlFor='scales'>Предварительный заказ</label>
        </div>
        <h4 className={styles.total}>{`Всего блюд на сумму: ${cart.reduce(
          (acc, position) => acc + Number(position.price) * Number(position.quantity),
          0,
        )} руб.`}</h4>
        {user.DiscountId !== 1 && (
          <h4>{`Цена с учётом вашей скидки ${user.discount}% - ${total.quantity} руб.`}</h4>
        )}
        {orderType === TYPE_DELIVERY ? (
          <button type='submit'>Oформить доставку</button>
        ) : checkOrderPossibility() ? (
          <button type='submit'>Оплатить</button>
        ) : (
          <p>
            Вам необходимо <Link to='/book'>забронировать</Link> столик, прежде чем делать предварительный
            заказ
          </p>
        )}
      </form>
    );
  } else {
    return <h2 className={styles.empty}>Ваша корзина пуста</h2>;
  }
}
