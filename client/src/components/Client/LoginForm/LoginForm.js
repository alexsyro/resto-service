import React from 'react';
import { useDispatch } from 'react-redux';
import { sagaAC } from '../../../redux/actionCreators/loginFormAC';
import styles from './LoginForm.module.scss';

function LoginForm() {

  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(sagaAC());
  };

  return (
    <form className={styles.center} action="/login" method="POST" name="loginForm" onSubmit={loginSubmit}>
      <input type="text" name="email" placeholder="Email"/>
      {/* <input type="text" name="login" placeholder="Enter your login"/> */}
      {/* <input type="phone" name="phone" placeholder="Enter your phone"/> */}
      <input type="password" name="password" placeholder="Enter your password"/>
      <button type="submit">Войти</button>
    </form>
  )
}

export default LoginForm;
