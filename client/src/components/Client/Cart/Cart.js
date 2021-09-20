import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartPosition from './CartPosition';

export default function Cart() {
  const [fullPrice, setFullPrice] = useState(0);

  const { cart } = useSelector((state) => state.cartReducer);
  console.log(cart, 'cartItems')
  // Вытаскиваем коризну из reducer
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // И вытаскиваем текущего пользователя из базы
  let user = { id: 1, name: 'Бларвер', phone: '77777777', discount: 5, isAuthorized: true };

  const makeOrder = (event) => {
    event.preventDefault();
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

  if (cart) {
    return (
      <form onSubmit={makeOrder}>
        <h3>Ваш заказ:</h3>
        <table>
          <thead>
            <td>Название</td>
            <td>Количество</td>
            <td>Цена</td>
            <td>Всего</td>
          </thead>
          <tbody>
            {cart.map((position) => (
              <CartPosition key={position.id} position={position} />
            ))}
          </tbody>
        </table>
        <h2>{`Всего блюд на сумму: ${cart.reduce(
          (acc, position) => acc + Number(position.price) * Number(position.quantity),
          0,
        )} руб.`}</h2>
        <h2>{`Цена с учётом вашей скидки ${user.discount}% - ${fullPrice} руб.`}</h2>
        <button type='submit'>OФормить предварительный заказ</button>
      </form>
    );
  } else {
    return <h2>Корзина пуста</h2>;
  }
}
