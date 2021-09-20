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
      <p>id:   {order.id}</p>
      <p>name:  {order['Client.name']}</p>
      <p>phone:   {order['Client.phone']}</p>
      <p>number of table:   {order['Reservation.table_id']}</p>
      <p>date and time:   {order['Reservation.date_time']}</p>
      <p>Quantity:   {order['OrderPositions.quantity']}</p>



      {order.completed ? null : <p>нуждается в обработке</p>}
      <Link to={`/orders/edit/${order.id}`} className="uk-button uk-button-default">Скорректировать</Link>
      <button onClick={() => finishOrder()} className="uk-button uk-button-primary"> перевести в статус подтвержденного</button>
    </li >
  );
}

export default ToCheckOrder;
