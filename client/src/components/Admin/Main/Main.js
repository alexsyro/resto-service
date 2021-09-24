import { Link } from 'react-router-dom';
import styles from './Main.module.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as ordersAC from '../../../redux/actionCreators/ordersAC';
import * as reservationsAC from '../../../redux/actionCreators/actionCreators';
const { REACT_APP_URL } = process.env;

function Main() {
  const dispatch = useDispatch();
  function myDateParse(rawString) {
    if (rawString) {
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
    } else {
      return {
        hours: null,
        minutes: null,
        day: null,
        month: null,
        year: null,
      };
    }
  }

  useEffect(() => {
    fetch(`${REACT_APP_URL}api/orders`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const allOrders = data.orders?.filter((order) => order.state_id !== 4); // Фильтруем доставку, ибо она всё сломает
        const ordersForState = allOrders?.map((order) => {
          console.log('AAAAAAAAAAAAAAA', order);
          return { ...order, timeFormat: myDateParse(order.Reservation?.date_time) };
        });
        dispatch(ordersAC.getOrdersAC(ordersForState));
      });

    fetch(`${REACT_APP_URL}api/reservations`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const allOrders = [...data.orders];
        const idToDelete = allOrders?.map((el) => el['Reservation.id']);
        const allReservations = [...data.reservations];
        // eslint-disable-next-line array-callback-return
        const reservationsWithoutOrders = allReservations?.filter((reservation) => {
          if (!idToDelete.includes(reservation.id)) {
            return true;
          }
        });

        const reservationsForState = reservationsWithoutOrders?.map((reservation) => {
          return { ...reservation, timeFormat: myDateParse(reservation.date_time) };
        });

        dispatch(reservationsAC.getReservationsAC(reservationsForState));
      });
    // здесь fetch (сага) в базу для получения списка заказов (причем только тех, что в обработке)
  }, [dispatch]);

  return (
    <div className={`${styles.container} uk-child-width-1-2@s`}>
      <Link to="/menu">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Меню</h3>
        </div>
      </Link>

      <Link to="/staff">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Персонал</h3>
        </div>
      </Link>

      <Link to="/clients">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Клиенты</h3>
        </div>
      </Link>

      <Link to="/orders">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Заказы</h3>
        </div>
      </Link>

      <Link to="/reservations">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Резервирования</h3>
        </div>
      </Link>
    </div>
  )
}

export default Main
