import React from 'react';
import { useDispatch } from 'react-redux';
import * as reservationsAC from '../../../redux/actionCreators/actionCreators';

const { REACT_APP_URL } = process.env;

function NewReserve({ reservation }) {
  const dispatch = useDispatch();
  const finishReservation = () => {
    fetch(`${REACT_APP_URL}api/reservations/done`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: reservation.id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then(console.log);
    dispatch(reservationsAC.completeReservationAC({ id: reservation.id }));
  };

  const cancelReservation = () => {
    fetch(`${REACT_APP_URL}api/reservations/cancel`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: reservation.id }), // body data type must match "Content-Type" header
    })
      .then((res) => res.json())
      .then(console.log);
    dispatch(reservationsAC.cancelReservationAC({ id: reservation.id }));
  };

  return (
    <tr>
      <td>{reservation.id}</td>
      <td>{reservation.guest_name}</td>
      <td>{reservation['Table.number']}</td>
      <td>{reservation.guest_count}</td>
      <td>{reservation.guest_phone}</td>
      <td>
        {`${reservation.timeFormat.day}  ${reservation.timeFormat.month}, ${reservation.timeFormat.year}`}
      </td>
      <td>{`${reservation.timeFormat.hours}:${reservation.timeFormat.minutes}`}</td>
      <td>{reservation['State.state']}</td>
      <td>
        <button  onClick={() => finishReservation()} className='uk-button uk-button-primary'>
          Подтвердить
        </button>
      </td>
      <td>
        <button onClick={() => cancelReservation()} className='uk-button uk-button-secondary'>
          Отменить
        </button>
      </td>
    </tr>
  );
}

export default NewReserve;
