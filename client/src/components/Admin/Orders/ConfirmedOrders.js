import React, { useState } from 'react';
import styles from './Orders.module.scss';

function DoneOrder({ order }) {
  const [menuList, setMenuList] = useState(false);
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.Client? order.Client.name : '--УДАЛЕН--'}</td>
      <td>{order.Client? order.Client.phone : '--УДАЛЕН--'}</td>
      <td>{order.Reservation? order.Reservation.id : '--УДАЛЕН--'}</td>
      <td>{order.Reservation? order.Reservation.Table.number : '--УДАЛЕН--'}</td>
      <td>{order.Reservation? order.Reservation.date_time.split('T')[0] : '--УДАЛЕН--'}</td>
      <td>{`${order.timeFormat.hours}:${order.timeFormat.minutes}`}</td>
      <td>{order.Reservation?.guest_count}</td>
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
