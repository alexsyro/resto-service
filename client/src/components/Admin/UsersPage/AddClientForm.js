import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { GET_CLIENTS } from '../../../redux/actionTypes/actionType';
import styles from './AddClientForm.module.scss';

const { REACT_APP_URL } = process.env;

function AddClientForm() {
  const dispatch = useDispatch();

  const history = useHistory();

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
      <div className={styles.form__block}>
        <form className={styles.form}
          onSubmit={addWorker}
          action={`${REACT_APP_URL}api/clients/new`}
          method='POST'
          name='addClientForm'
        >
          <fieldset className="uk-fieldset">

            <legend className="uk-legend" style={{ color: 'white' }}>Добавление клиента</legend>

            <div className="uk-margin">
              <input className="uk-input" type='text' name='name' placeholder='Имя клиента' required />
            </div>
            <div className="uk-margin">
              <input className='uk-input' type='email' name='email' placeholder='Email' required />
            </div>
            <div className="uk-margin">
              <input className="uk-input" type='phone' name='phone' placeholder='Телефон' required />
            </div>
            <div className="uk-margin">
              <input className="uk-input" type='text' name='discount' placeholder='Cкидка' required />
            </div>
            <div className={styles.center}>
              <button className={`uk-button uk-button-primary ${styles.submit__btn}`} type='submit'>Добавить</button>
            </div>

            <button type='button' onClick={() => history.goBack()} className={`uk-button uk-button-default uk-margin ${styles.back_btn}`}>
              Назад
            </button>

          </fieldset>
        </form>
      </div>
  );
}

export default AddClientForm;

