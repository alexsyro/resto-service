import React from 'react';
import { useDispatch } from 'react-redux'
import * as reservationsAC from '../../../redux/actionCreators/actionCreators'

const { REACT_APP_URL } = process.env;

function ToCheckReservation({ reservation }) {
  const dispatch = useDispatch()
  const finishReservation = () => {
    fetch(`${REACT_APP_URL}api/reservations/done`, {
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

  const cancelReservation = () => {
    fetch(`${REACT_APP_URL}api/reservations/cancel`, {
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
    dispatch(reservationsAC.cancelReservationAC({ id: reservation.id }))
  }

  return (
    <li>
      <button onClick={() => finishReservation()} className="uk-button uk-button-primary"> перевести в статус подтвержденного</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер резерва:   {reservation.id}</span>
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


      <button onClick={() => cancelReservation()} className="uk-button uk-button-default">Отменить резерв</button>

    </li >
  );
}

export default ToCheckReservation;
