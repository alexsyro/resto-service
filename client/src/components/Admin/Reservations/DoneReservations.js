import React from 'react';

function DoneReservations({ reservations }) {
  return (
    <li>
      <p>id:   {reservations.id}</p>
      <p>name:  {reservations['Client.name']}</p>
      <p>phone:   {reservations['Client.phone']}</p>
      <p>number of table:   {reservations['Reservation.table_id']}</p>
      <p>date and time:   {reservations['Reservation.date_time']}</p>
      {reservations.completed === 'Checked' ? <p>обработан</p> : null}
    </li>
  );
}

export default DoneReservations;
