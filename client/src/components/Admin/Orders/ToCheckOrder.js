import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as ordersAC from '../../../redux/actionCreators/ordersAC'

function ToCheckOrder({ order }) {
  const dispatch = useDispatch()
  const [menuList, setMenuList] = useState(false)

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

  const cancelOrder = () => {
    fetch('http://localhost:1234/api/orders/cancel', {
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
    dispatch(ordersAC.cancelOrderAC({ id: order.id }))
  }

  const cancelPosition = (position_id) => {
    fetch('http://localhost:1234/api/orders/position', {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: position_id }) // body data type must match "Content-Type" header
    })
      .then(res => res.json())
      .then(console.log)
    dispatch(ordersAC.deleteOrderPositionAC({ id: position_id }))
  }

  return (
    <li>
      <button onClick={() => finishOrder()} className="uk-button uk-button-primary"> перевести в статус подтвержденного</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер заказа:   {order.id}</span>
        <span>Имя клиента:  {order.Client.name}</span>
        <span>Телефон клиента:   {order.Client.phone}</span>
      </div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>Номер резерва столика:   {order.Reservation.id}</span>
        {order.Reservation.Table ? <span>Номер столика:   {order.Reservation.Table.number}</span> : null}
        <span>Дата бронирования: {`${order.timeFormat.day}  ${order.timeFormat.month}, ${order.timeFormat.year}`}</span>
        <span>Время бронирования: {`${order.timeFormat.hours}:${order.timeFormat.minutes}`}</span>
        <span>Количество гостей:   {order.Reservation.guest_count}</span>
      </div>
      <hr />
      <button className='uk-button uk-button-small' onClick={() => setMenuList(prev => !prev)}> {menuList ? 'Скрыть' : 'Вывести'} список заказанных блюд</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {menuList && <ol>
          {order.OrderPositions.map(position => {
            return <li key={position.id}>
              <p>{`Блюдо: ${position.Position.name}`}</p>
              <p>{`Цена: ${position.Position.price} рублей`}</p>
              <p>{`Количество: ${position.quantity}`}</p>
              <p>{`Итого: ${position.Position.price * position.quantity} рублей`}</p>
              <button onClick={() => cancelPosition(position.id)} className="uk-button uk-button-primary"> Удалить блюдо</button>

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

      <button onClick={() => cancelOrder()} className="uk-button uk-button-primary"> Отменить заказ</button>
      <Link to={`/orders/${order.id}`} className="uk-button uk-button-default">Изменить резервирование столика</Link>

    </li >
  );
}

export default ToCheckOrder;
