import React, { useState } from 'react';

function DoneOrder({ order }) {
  const [menuList, setMenuList] = useState(false)

  return (
    <li>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер заказа:   {order.id}</span>
        <span>Имя клиента:  {order.Client.name}</span>
        <span>Телефон клиента:   {order.Client.phone}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер столика:   {order.Reservation.table_id}</span>
        <span>Дата бронирования: {`${order.timeFormat.day}  ${order.timeFormat.month}, ${order.timeFormat.year}`}</span>
        <span>Время бронирования: {`${order.timeFormat.hours}:${order.timeFormat.minutes}`}</span>
        <span>Количество гостей:   {order.Reservation.guest_count}</span>
      </div>
      <button className='uk-button uk-button-small' onClick={() => setMenuList(prev => !prev)}> {menuList ? 'Скрыть' : 'Вывести'} список заказанных блюд</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {menuList && <ol>
          {order.OrderPositions.map(position => {
            return <li key={position.id}>
              <p>{`Блюдо: ${position.Position.name}`}</p>
              <p>{`Цена: ${position.Position.price} рублей`}</p>
              <p>{`Количество: ${position.quantity}`}</p>
              <p>{`Итого: ${position.Position.price * position.quantity} рублей`}</p>
              <hr />
            </li>
          })}
        </ol>}
      </div>
      <p>Статус заказа:   {order.State.state}</p>
      <p>Общая стоимость заказа: {order.OrderPositions.reduce((acc, sum) => {
        return acc + (sum.Position.price * sum.quantity)
      }, 0)}
      </p>
    </li >
  );
}

export default DoneOrder;
