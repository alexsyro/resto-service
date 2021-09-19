import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_STAFF } from '../../../redux/actionTypes/actionType'


function AddWorkerForm() {

  const dispatch = useDispatch();

  const addWorker = (e) => {
    e.preventDefault();

    const { action, method, name, position, login, password, phone } = e.target;
    fetch(action, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: {
        name: name.value,
        position: position.value,
        login: login.value,
        password: password.value,
        phone: phone.value,
      }
    })
      .then(res => res.json())
      .then(data => dispatch({ type: GET_STAFF, action: data }))
  };

  return (
    <form onSubmit={addWorker} action="http://localhost:1234/addworker" method="POST" name="addWorkerForm" >
      <input type="text" name="name" placeholder="Имя сотрудника" />
      <input type="text" name="position" placeholder="Должность" />
      <input type="text" name="phone" placeholder="Телефон" />
      <input type="text" name="login" placeholder="Логин" />
      <input type="text" name="phone" placeholder="Пароль" />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddWorkerForm;
