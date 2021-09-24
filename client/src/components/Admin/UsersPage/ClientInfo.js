import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UPD_CLIENTS } from '../../../redux/actionTypes/actionType';
import styles from './ClientInfo.module.scss';

const { REACT_APP_URL } = process.env;

function ClientInfo() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { clientId } = useParams();

  const allClients = useSelector((state) => state.clientsReducer.clients);
  const currentClient = allClients.find((client) => client.id === +clientId);
  console.log(currentClient, 'currentClient');

  const inputName = useRef(null);
  const inputEmail = useRef(null);
  const inputPhone = useRef(null);
  const inputDiscount = useRef(null);

  const handlerSave = () => {
    const updateClient = {
      id: currentClient.id,
      inputName: inputName.current.value,
      inputEmail: inputEmail.current.value,
      inputPhone: inputPhone.current.value,
      inputDiscount: inputDiscount.current.value,
    };
    console.log(updateClient);
    dispatch({ type: UPD_CLIENTS, payload: updateClient });

    fetch(`${REACT_APP_URL}api/clients/edit/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateClient),
    }).then(console.log('update')); //cделать редирект
  };

  return (
      <div className={styles.form__block}>
        <form className={styles.form}>
          <fieldset className="uk-fieldset">

            <legend className="uk-legend" style={{ color: 'white' }}>Редактирование данных клиента</legend>

            <div className="uk-margin">
              <input className="uk-input"
                ref={inputName}
                type='text'
                defaultValue={currentClient?.name}
                placeholder='Имя'
                required />
            </div>
            <div className="uk-margin">
              <input
                className='uk-input'
                ref={inputEmail}
                type='text'
                defaultValue={currentClient?.position}
                placeholder='Email'
                required />
            </div>
            <div className="uk-margin">
              <input className="uk-input"
                ref={inputPhone}
                type='phone'
                defaultValue={currentClient?.phone}
                placeholder='Номер телефона'
                required />
            </div>
            <div className="uk-margin">
              <input className="uk-input"
                ref={inputDiscount}
                type='text'
                defaultValue={currentClient?.discount}
                placeholder='Скидка'
                required />
            </div>
            <div className={styles.center}>
              <button className={`uk-button uk-button-primary ${styles.submit__btn}`} onClick={handlerSave}>Сохранить</button>
            </div>

            <button type='button' onClick={() => history.goBack()} className={`uk-button uk-button-default uk-margin ${styles.back_btn}`}>
              Назад
            </button>

          </fieldset>
        </form>
      </div>
  );
}

export default ClientInfo;
