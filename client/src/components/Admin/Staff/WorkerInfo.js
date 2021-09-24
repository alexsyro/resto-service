import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UPD_STAFF } from '../../../redux/actionTypes/actionType';
import styles from './WorkerInfo.module.scss'

const { REACT_APP_URL } = process.env;

function WorkerInfo() {
  const dispatch = useDispatch();

  const history = useHistory();
  const { staffId } = useParams();

  const allStaff = useSelector((state) => state.staffReducer.staff);
  const currentWorker = allStaff.find((worker) => worker.id === +staffId);

  const inputName = useRef(null);
  const inputPosition = useRef(null);
  const inputLogin = useRef(null);
  const inputPassword = useRef(null);
  const inputPhone = useRef(null);

  const handlerSave = () => {
    const updateWorker = {
      id: currentWorker.id,
      inputName: inputName.current.value,
      inputPosition: inputPosition.current.value,
      inputLogin: inputLogin.current.value,
      inputPassword: inputPassword.current.value,
      inputPhone: inputPhone.current.value,
    };
    dispatch({ type: UPD_STAFF, payload: updateWorker });

    fetch(`${REACT_APP_URL}api/staff/${staffId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateWorker),
    }).then(history.push('/staff')); //cделать редирект
  };

  return (
    <>
      <div className={styles.form__block}>
        <form className={styles.form}>
          <fieldset className="uk-fieldset">

            <legend className="uk-legend" style={{ color: 'white' }}>Редактирование данных сотрудника</legend>

            <div className="uk-margin">
              <input className="uk-input"
                ref={inputName}
                type='text'
                defaultValue={currentWorker?.name}
                placeholder='Name' />
            </div>
            <div className="uk-margin">
              <input className="uk-input"
                ref={inputLogin}
                type='text'
                defaultValue={currentWorker?.login}
                placeholder='Login' />
            </div>
            <div className="uk-margin">
              <input className="uk-input"
                ref={inputPhone}
                type='phone'
                defaultValue={currentWorker?.phone}
                placeholder='Phone' />
            </div>
            <div className={styles.center}>
              <button className={`uk-button uk-button-primary ${styles.submit__btn}`} onClick={handlerSave}>Изменить</button>
            </div>

            <button type='button' onClick={() => history.goBack()} className={`uk-button uk-button-default uk-margin ${styles.back_btn}`}>
              Назад
            </button>

          </fieldset>
        </form>
      </div>
    </>
  );
}

export default WorkerInfo;
