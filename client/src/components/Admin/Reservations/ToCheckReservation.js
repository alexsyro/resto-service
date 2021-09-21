import React from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as reservationsAC from '../../../redux/actionCreators/actionCreators'

function ToCheckReservation({ reservation }) {
  const dispatch = useDispatch()
  const finishReservation = () => {
    fetch('http://localhost:1234/api/reservations/done', {
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
    dispatch(reservationsAC.completeReservationAC({ id: reservation.id }))
  }

  return (
    <li>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер заказа:   {reservation.id}</span>
        <span>Имя клиента:  {reservation.guest_name}</span>
        <span>Телефон клиента:   {reservation.guest_phone}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер столика:   {reservation.table_id}</span>
        <span>Дата бронирования: {`${reservation.timeFormat.day}  ${reservation.timeFormat.month}, ${reservation.timeFormat.year}`}</span>
        <span>Время бронирования: {`${reservation.timeFormat.hours}:${reservation.timeFormat.minutes}`}</span>
        <span>Количество гостей:   {reservation.guest_count}</span>
      </div>

      <p>Статус заказа:   {reservation['State.state']}</p>


      <Link to={`/reservations/edit/${reservation.id}`} className="uk-button uk-button-default">Скорректировать</Link>
      <button onClick={() => finishReservation()} className="uk-button uk-button-primary"> перевести в статус подтвержденного</button>
    </li >
  );
}

export default ToCheckReservation;
