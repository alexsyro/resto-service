import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { sagaLoginAC } from '../../../redux/actionCreators/sagaAC';
import styles from './LoginForm.module.scss';

function LoginForm() {
const history = useHistory()
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
      const user = {
        email: email.value,
        password: password.value,
      }
    const payload = user;
    dispatch(sagaLoginAC(payload));
      history.push('/')
  };

  return (
    <form className={styles.center} name="loginForm" onSubmit={loginSubmit}>
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Enter your password" />
      <button type="submit">Войти</button>
    </form>
  )
}

export default LoginForm;
