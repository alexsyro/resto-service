import React from 'react';
import { useDispatch } from 'react-redux';
// import { sagaLoginAC } from '../../../redux/actionCreators/loginFormAC';
import styles from './LoginForm.module.scss';
import { GET_USER } from '../../../redux/actionTypes/actionType'

function LoginForm() {

  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    // dispatch(sagaLoginAC());
    const { action, method, email, password } = e.target;
    fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: {
        email: email.value,
        password: password.value
      }
    })
    .then(res => res.json())
    .then(data => dispatch({type: GET_USER, action: data}))
  };

  return (
    <form className={styles.center} action="http://localhost:1234/login" method="POST" name="loginForm" onSubmit={loginSubmit}>
      <input type="text" name="email" placeholder="Email" />
      {/* <input type="text" name="login" placeholder="Enter your login"/> */}
      {/* <input type="phone" name="phone" placeholder="Enter your phone"/> */}
      <input type="password" name="password" placeholder="Enter your password" />
      <button type="submit">Войти</button>
    </form>
  )
}

export default LoginForm;
