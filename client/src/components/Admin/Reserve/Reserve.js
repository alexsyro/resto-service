import React, { useEffect, useState } from 'react';
import styles from './Reserve.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as reservationsAC from '../../../redux/actionCreators/actionCreators';

import NewReserve from './NewReserve';
import AcceptedReserve from './AcceptedReserve';

function Reservations() {
  const [completedList, setCompletedList] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  function myDateParse(rawString) {
    let arr = rawString.split(/\D/);
    arr[6] = arr[6].substr(0, 3); // Microseconds to milliseconds
    let months = {
      '01': 'Январь',
      '02': 'Февраль',
      '03': 'Март',
      '04': 'Апрель',
      '05': 'Май',
      '06': 'Июнь',
      '07': 'Июль',
      '08': 'Август',
      '09': 'Сентябрь',
      10: 'Октябрь',
      11: 'Ноябрь',
      12: 'Декабрь',
    };
    return {
      hours: arr[3],
      minutes: arr[4],
      day: arr[2],
      month: months[arr[1]],
      year: arr[0],
    };
  }

  useEffect(() => {
    fetch('http://localhost:1234/api/reservations', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const allOrders = [...data.orders];
        const idToDelete = allOrders.map((el) => el['Reservation.id']);
        const allReservations = [...data.reservations];
        const reservationsWithoutOrders = allReservations.filter((reservation) => {
          if (!idToDelete.includes(reservation.id)) {
            return true;
          }
        });

        const reservationsForState = reservationsWithoutOrders.map((reservation) => {
          return { ...reservation, timeFormat: myDateParse(reservation.date_time) };
        });

        dispatch(reservationsAC.getReservationsAC(reservationsForState));
      });
    // здесь fetch (сага) в базу для получения списка заказов (причем только тех, что в обработке)
  }, [dispatch]);

  const finishedReservations = useSelector((state) =>
    state.reservationReducer.reservations?.filter((reservation) =>
      [2, 6, 7].includes(reservation['State.id']),
    ),
  );

  const toCheckReservations = useSelector((state) =>
    state.reservationReducer.reservations?.filter((reservation) =>
      [1, 3, 4, 5].includes(reservation['State.id']),
    ),
  );

  return (
    <div className={styles.container}>
      {completedList ? (
        <button className='uk-button uk-button-default' onClick={() => setCompletedList((prev) => !prev)}>
          {' '}
          Скрыть список завершенных(обработанных) заказов
        </button>
      ) : (
        <button className='uk-button uk-button-default' onClick={() => setCompletedList((prev) => !prev)}>
          Вывести список завершенных(обработанных) заказов
        </button>
      )}
      <br />
      {completedList && finishedReservations.length ? (
        <table>
          <thead>
            <tr>
              <td>Номер резерва</td>
              <td>Имя клиента</td>
              <td>Номер столика</td>
              <td>Количество гостей</td>
              <td>Телефон</td>
              <td>Дата бронирования</td>
              <td>На какое время</td>
              <td>Статус заказа</td>
            </tr>
          </thead>
          <tbody>
            {finishedReservations.map((reservation) => (
              <AcceptedReserve key={reservation.id} reservation={reservation} />
            ))}
          </tbody>
        </table>
      ) : null}
      <br />
      <h2>Заказы, ожидающие обработки </h2>
      {toCheckReservations.length ? (
        <table>
          <thead>
            <tr>
              <td>Номер резерва</td>
              <td>Имя клиента</td>
              <td>Номер столика</td>
              <td>Количество гостей</td>
              <td>Телефон</td>
              <td>Дата бронирования</td>
              <td>На какое время</td>
              <td>Статус заказа</td>
              <td>Подтвердить</td>
              <td>Отменить</td>
            </tr>
          </thead>
          <tbody>
            {toCheckReservations.map((reservation) => (
              <NewReserve key={reservation.id} reservation={reservation} />
            ))}
          </tbody>
        </table>
      ) : null}

      <button className='uk-button uk-button-default' onClick={() => history.goBack()}>
        Назад
      </button>
    </div>
  );
}

export default Reservations;