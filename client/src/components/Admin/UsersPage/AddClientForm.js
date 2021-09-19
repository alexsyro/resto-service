import React from 'react';
import { useDispatch } from 'react-redux';
import { GET_CLIENTS } from '../../../redux/actionTypes/actionType';

function AddClientForm() {
  const dispatch = useDispatch();

  const addWorker = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const { action, method, name, email, phone, discount } = e.target;
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('bonus', discount.value);
    fetch(action, {
      method,
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => dispatch({ type: GET_CLIENTS, action: data }));
  };

  return (
    <form
      onSubmit={addWorker}
      action='http://localhost:1234/api/clients/new'
      method='POST'
      name='addClientForm'
    >
      <input type='text' name='name' placeholder='Имя сотрудника' />
      <input type='text' name='email' placeholder='Должность' />
      <input type='text' name='phone' placeholder='Телефон' />
      <input type='text' name='discount' placeholder='Cкидка' />
      <button type='submit'>Добавить</button>
    </form>
  );
}

export default AddClientForm;

