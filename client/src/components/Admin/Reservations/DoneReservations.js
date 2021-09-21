import React from 'react';

function DoneReservations({ reservation }) {
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
    </li>
  );
}

export default DoneReservations;
