import React, { useState } from 'react';
import styles from './Orders.module.scss';

function DoneOrder({ order }) {
  const [menuList, setMenuList] = useState(false);

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.Client?.name}</td>
      <td>{order.Client?.phone}</td>
      <td>{order.Reservation.id}</td>
      <td>{order.Reservation.table_id}</td>
      <td>{order.Reservation.date_time.split('T')[0]}</td>
      <td>{`${order.timeFormat.hours}:${order.timeFormat.minutes}`}</td>
      <td>{order.Reservation.guest_count}</td>
      <button className='uk-button uk-button-primary' onClick={() => setMenuList((prev) => !prev)}>
          {menuList ? 'Скрыть' : 'Показать'}
        </button>
      {menuList && (
        <table className={styles.positionsTableList}>
          <thead>
            <tr>
              {/* <td>#</td> */}
              <td>Имя</td>
              <td>Количество</td>
            </tr>
          </thead>
          <tbody>
            {order.OrderPositions.map((position) => {
              return (
                <tr key={position.id}>
                  {/* <td>{position.id}</td> */}
                  <td>{position.Position.name}</td>
                  <td>{position.quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <td>{order.State.state}</td>
      <td>
        {order.OrderPositions.reduce((acc, sum) => {
          return acc + sum.Position.price * sum.quantity;
        }, 0)}
      </td>
    </tr>
  );
}

export default DoneOrder;
