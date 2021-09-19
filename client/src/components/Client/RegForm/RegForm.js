import React from 'react';
import { useDispatch } from 'react-redux';
import { sagaRegAC } from '../../../redux/actionCreators/regFormAC';
import styles from './RegForm.module.scss';

// const checkEmptyFields = (fields) => {
//   fields.every(field => field.value.length);
// };

function RegForm() {
  const dispatch = useDispatch();

  const regSubmit = (e) => {
    e.preventDefault();
    // dispatch(sagaRegAC());
    const { action, method, email, login, phone, password } = e.target;
    // const fields = [email, password];
    // const Empty = checkEmptyFields(fields);
    // if(Empty) {
    const user = {
      action,
      method,
      email: email.value,
      login: login.value,
      phone: phone.value,
      password: password.value,
    }
    const payload = user;
    dispatch(sagaRegAC(payload));
    // } 
    // else {
    // alert('Заполните все поля') 
    // пока заглушка
    // }
  };


  return (
    <form className={styles.center} action="http://localhost:1234/registration" method="POST" name="regForm" onSubmit={regSubmit}>
      <input type="text" name="email" placeholder="Email" />
      <input type="text" name="login" placeholder="Enter your login" />
      <input type="phone" name="phone" placeholder="Enter your phone" />
      <input type="password" name="password" placeholder="Enter your password" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}

export default RegForm

