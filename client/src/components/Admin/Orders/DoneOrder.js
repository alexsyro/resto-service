import React from 'react';

function DoneOrder({ order }) {
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
    </li>
  );
}

export default DoneOrder;
