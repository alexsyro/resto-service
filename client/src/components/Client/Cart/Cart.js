import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CartPosition from './CartPosition';

const TYPE_PREORDER = 5;
const TYPE_DELIVERY = 4;

export default function Cart() {
  console.log('CART RENDER HAPPENNING');
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
    // event.preventDefault();
    console.log('EVENT', event);
    if (event.target.id === 'preorder') {
      setOrderType(TYPE_PREORDER);
    } else if (event.target.id === 'delivery') {
      setOrderType(TYPE_DELIVERY);
    }
    // console.log('orderType', orderType);
  };

  const makeOrder = (event) => {
    event.preventDefault();
    console.log(reservation);
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
    const price = cart.reduce((acc, position) => acc + Number(position.price) * Number(position.quantity), 0);
    setFullPrice(price - (price * user.discount) / 100);
  }, [cart]);

  const total = useSelector((state) => state.cartReducer.cart);
  console.log(total, 'TOTAL')

  if (cart.length) {
    return (
      <form onSubmit={makeOrder}>
        <h3>Ваш заказ:</h3>
        <table>
          <thead>
            <tr>
              <td>Название</td>
              <td>Количество</td>
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
        <div>
          <h2>Выберете тип заказа</h2>
          <input
            onChange={orderTypeHandler}
            type='checkbox'
            id='delivery'
            checked={orderType === TYPE_DELIVERY}
          />
          <label htmlFor='scales'>Доставка</label>
          <input
            onChange={orderTypeHandler}
            type='checkbox'
            id='preorder'
            checked={orderType === TYPE_PREORDER}
          />
          <label htmlFor='scales'>Предварительный заказ</label>
        </div>

        <h2>{`Всего блюд на сумму: ${cart.reduce(
          (acc, position) => acc + Number(position.price) * Number(position.quantity),
          0,
        )} руб.`}</h2>
<<<<<<< HEAD
        <h2>{`Цена с учётом вашей скидки ${user.discount}% - ${fullPrice} руб.`}</h2>
        <button type='submit'>OФормить предварительный заказ</button>
=======
        {user.DiscountId !== 1 && (
          <h2>{`Цена с учётом вашей скидки ${user.discount}% - ${total.quantity} руб.`}</h2>
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
>>>>>>> cartOrder
      </form>
    );
  } else {
    return <h2>Корзина пуста</h2>;
  }
}
