import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import * as ordersAC from '../../../redux/actionCreators/ordersAC'

function ToCheckReservation({ reservation }) {
  const dispatch = useDispatch()
  const finishOrder = () => {
    fetch('http://localhost:1234/api/orders/done', {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: reservation.id }) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(console.log)

    // dispatch(ordersAC.completeOrderAC({ id: reservation.id }))
  }

  return (
    <li>
      <p>id:   {reservation.id}</p>
      <p>name:  {reservation['Client.name']}</p>
      <p>phone:   {reservation['Client.phone']}</p>
      <p>number of table:   {reservation['Reservation.table_id']}</p>
      <p>date and time:   {reservation['Reservation.date_time']}</p>
      <p>Quantity:   {reservation['OrderPositions.quantity']}</p>



      {reservation.completed ? null : <p>нуждается в обработке</p>}
      <Link to={`/orders/edit/${reservation.id}`} className="uk-button uk-button-default">Скорректировать</Link>
      <button onClick={() => finishOrder()} className="uk-button uk-button-primary"> перевести в статус подтвержденного</button>
    </li >
  );
}

export default ToCheckReservation;
