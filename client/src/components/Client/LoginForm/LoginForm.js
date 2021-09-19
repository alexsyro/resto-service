import React from 'react';
import { useDispatch } from 'react-redux';
import { sagaLoginAC } from '../../../redux/actionCreators/loginFormAC';
import styles from './LoginForm.module.scss';

// const checkEmptyFields = (fields) => {
//   fields.every(field => field.value.length);
// };

function LoginForm() {

  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    const { action, method, email, password } = e.target;
    // const fields = [email, password];
    // const Empty = checkEmptyFields(fields);
    // if(Empty) {
      const user = {
        action,
        method,
        email: email.value,
        password: password.value,
      }
    const payload = user;
    dispatch(sagaLoginAC(payload));
    // } 
    // else {
      // alert('Заполните все поля') 
      // пока заглушка
    // }
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
