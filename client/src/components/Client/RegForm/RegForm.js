import React from 'react';
import { useDispatch } from 'react-redux';
// import { sagaRegAC } from '../../../redux/actionCreators/regFormAC';
import styles from './RegForm.module.scss';
import { GET_USER } from '../../../redux/actionTypes/actionType'

function RegForm() {

  const regSubmit = (e) => {
    e.preventDefault();
    // dispatch(sagaRegAC());
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

  const dispatch = useDispatch();
  
  return (
    <form className={styles.center} action="http://localhost:1234/registration" method="POST" name="regForm" onSubmit={regSubmit}>
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="login" placeholder="Enter your login"/>
      <input type="phone" name="phone" placeholder="Enter your phone"/>
      <input type="password" name="password" placeholder="Enter your password" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}

export default RegForm

