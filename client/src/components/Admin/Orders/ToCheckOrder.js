import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as ordersAC from '../../../redux/actionCreators/ordersAC'

function ToCheckOrder({ order }) {
  const dispatch = useDispatch()

  const finishOrder = () => {
    fetch('http://localhost:1234/api/orders/done', {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: order.id }) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(console.log)
    dispatch(ordersAC.completeOrderAC({ id: order.id }))
  }

  return (
    <li>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер заказа:   {order.id}</span>
        <span>Имя клиента:  {order['Client.name']}</span>
        <span>Телефон клиента:   {order['Client.phone']}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер столика:   {order['Reservation.table_id']}</span>
        <span>Дата бронирования: {`${order.timeFormat.day}  ${order.timeFormat.month}, ${order.timeFormat.year}`}</span>
        <span>Время бронирования: {`${order.timeFormat.hours}:${order.timeFormat.minutes}`}</span>
        <span>Количество гостей:   {order['Reservation.guest_count']}</span>
      </div>

      <p>Статус заказа:   {order['State.state']}</p>


      <Link to={`/reservations/edit/${order.id}`} className="uk-button uk-button-default">Скорректировать</Link>
      <button onClick={() => finishOrder()} className="uk-button uk-button-primary"> перевести в статус подтвержденного</button>
    </li >
  );
}

export default ToCheckOrder;
