import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as ordersAC from '../../../redux/actionCreators/ordersAC';

const { REACT_APP_URL } = process.env;

function NewOrders({ order }) {
  const dispatch = useDispatch();
  const [menuList, setMenuList] = useState(false);

  const finishOrder = () => {
    fetch(`${REACT_APP_URL}api/orders/done`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: order.id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then(console.log);
    dispatch(ordersAC.completeOrderAC({ id: order.id }));
  };

  const cancelOrder = () => {
    fetch(`${REACT_APP_URL}api/orders/cancel`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: order.id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then(console.log);
    dispatch(ordersAC.cancelOrderAC({ id: order.id }));
  };

  const cancelPosition = (position_id) => {
    fetch(`${REACT_APP_URL}api/orders/position`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: position_id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then(console.log);
    dispatch(ordersAC.deleteOrderPositionAC({ id: position_id }));
  };

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.Client? order.Client.name : '--УДАЛЕН--'}</td>
      <td>{order.Client? order.Client.phone : '--УДАЛЕН--'}</td>
      <td>{order.Reservation? order.Reservation.id : '--УДАЛЕН--'}</td>
      <td>
        <Link to={`/orders/${order.id}`} className='uk-button uk-button-primary'>
          Изменить
        </Link>
      </td>
      <td> {order.Reservation?.Table ? <p>{order.Reservation.Table.number}</p> : null}</td>
      <td>
        {order.Reservation?.guest_count}
      </td>
      <td>{order.Reservation?.date_time.split('T')[0]}</td>
      <td>{`${order.timeFormat.hours}:${order.timeFormat.minutes}`}</td>
      <td>
        <button className='uk-button uk-button-primary' onClick={() => setMenuList((prev) => !prev)}>
          {menuList ? 'Скрыть' : 'Показать'}
        </button>
        {menuList && (
          <table>
            <thead>
              <tr>
                {/* <td>#</td> */}
                <td>Имя</td>
                <td>Количество</td>
                <td>Удалить</td>
              </tr>
            </thead>
            <tbody>
              {order.OrderPositions.map((position) => {
                return (
                  <tr key={position.id}>
                    {/* <td>{position.id}</td> */}
                    <td>{position.Position.name}</td>
                    <td>{position.quantity}</td>
                    <button
                      onClick={() => cancelPosition(position.id)}
                    >
                      -
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </td>
      <td>{order.State.state}</td>
      <td>
        {order.OrderPositions.reduce((acc, sum) => {
          return acc + sum.Position.price * sum.quantity;
        }, 0)}
      </td>
      <td>
        <button onClick={() => finishOrder()} className='uk-button uk-button-primary'>
          Подтвердить
        </button>
      </td>
      <td>
        <button onClick={() => cancelOrder()} className='uk-button uk-button-secondary'>
          Отмена
        </button>
      </td>
    </tr>
  );
}

export default NewOrders;
