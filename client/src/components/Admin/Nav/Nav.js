import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { sagaLogoutAC } from '../../../redux/actionCreators/sagaAC';
import styles from './Nav.module.scss';

function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

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
          <li className='uk-active'>
            <Link to='/orders'>ЗАКАЗЫ</Link>
          </li>
          <li className='uk-active'>
            <Link to='/reservations'>РЕЗЕРВИРОВАНИЯ</Link>
          </li>
          <li className='uk-active'>
            <Link onClick={logoutHandler} to='/'>
              ВЫХОД
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
