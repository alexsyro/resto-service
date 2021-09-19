import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_STAFF } from '../../../redux/actionTypes/actionType';

function AddWorkerForm() {
  const dispatch = useDispatch();

  const addWorker = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const [file] = e.target.file.files;
    const { action, method, name, position, login, password, phone } = e.target;
    formData.append('file', file);
    formData.append('name', name.value);
    formData.append('position', position.value);
    formData.append('login', login.value);
    formData.append('password', password.value);
    formData.append('phone', phone.value);
    fetch(action, {
      method,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_STAFF, action: data }));
  };

  return (
    <form
      onSubmit={addWorker}
      action='http://localhost:1234/api/staff/new'
      method='POST'
      name='addWorkerForm'
    >
      <input type='text' name='name' placeholder='Имя сотрудника' />
      <input type='text' name='position' placeholder='Должность' />
      <input type='text' name='phone' placeholder='Телефон' />
      <input type='text' name='login' placeholder='Логин' />
      <input type='text' name='password' placeholder='Пароль' />
      <input type='file' name='file' />
      <button type='submit'>Добавить</button>
    </form>
  );
}

export default AddWorkerForm;
