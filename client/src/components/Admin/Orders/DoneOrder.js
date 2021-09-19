import React from 'react';

function DoneOrder({ order }) {
  return (
    <li>
      <p>id:   {order.id}</p>
      <p>name:  {order['Client.name']}</p>
      <p>phone:   {order['Client.phone']}</p>
      <p>number of table:   {order['Reservation.table_id']}</p>
      <p>date and time:   {order['Reservation.date_time']}</p>
      {order.completed === 'Checked' ? <p>обработан</p> : null}
    </li>
  );
}

export default DoneOrder;
