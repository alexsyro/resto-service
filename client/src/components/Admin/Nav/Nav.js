import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { sagaLogoutAC } from '../../../redux/actionCreators/sagaAC';
import styles from './Nav.module.scss';
import { useSelector } from 'react-redux';


function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();
  const toCheckOrders = useSelector((state) =>
    state.ordersReducer.orders?.filter((order) => [1, 3, 4, 5].includes(order['state_id'])),
  );

  const toCheckReservations = useSelector((state) =>
    state.reservationReducer.reservations?.filter((reservation) =>
      [1, 3, 4, 5].includes(reservation['State.id']),
    ),
  );

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(sagaLogoutAC());
    history.push('/');
  };
  return (
    <nav className={`uk-navbar-container ${styles.nav}`} uk-navbar='true'>
      <div className='uk-navbar-left'>
        <ul className='uk-navbar-nav'>
          <li className='uk-active'>
            <Link to='/'>Главная</Link>
          </li>
          <li className='uk-active'>
            <Link to='/menu'>МЕНЮ</Link>
          </li>
          <li className='uk-active'>
            <Link to='/staff'>ПЕРСОНАЛ</Link>
          </li>
          <li className='uk-active'>
            <Link to='/clients'>КЛИЕНТЫ</Link>
          </li>
          <li className={`uk-active ${styles.content}`}>
            <Link to='/orders'><span>ЗАКАЗЫ</span>{toCheckOrders?.length ? <span className={`${styles.counter}`} >{` ${toCheckOrders?.length}`}</span> : null}</Link>
          </li>
          <li className={`uk-active ${styles.content}`}>
            <Link to='/reservations'> <span>РЕЗЕРВИРОВАНИЯ</span>{toCheckReservations?.length ? <span className={`${styles.counter2}`}>{` ${toCheckReservations?.length}`}</span> : null}</Link>
          </li>
          <li className='uk-active'>
            <Link onClick={logoutHandler} to='/'>
              ВЫХОД
            </Link>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default Nav;
