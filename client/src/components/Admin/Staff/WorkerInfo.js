import React, { useRef } from 'react';
import { useParams, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { UPD_STAFF } from '../../../redux/actionTypes/actionType';

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
    <div>
      <div className='uk-card uk-card-primary uk-card-body'>
        <div className='uk-margin'>
          <input
            ref={inputName}
            className='uk-input'
            type='text'
            defaultValue={currentWorker?.name}
            placeholder='Name'
          />
        </div>

        <div className='uk-margin'>
          <input
            ref={inputPosition}
            className='uk-input'
            type='text'
            defaultValue={currentWorker?.position}
            placeholder='Position'
          />
        </div>

        <div className='uk-margin'>
          <input
            ref={inputLogin}
            className='uk-input'
            type='text'
            defaultValue={currentWorker?.login}
            placeholder='Login'
          />
        </div>

        <div className='uk-margin'>
          <input
            ref={inputPassword}
            className='uk-input'
            type='text'
            defaultValue={currentWorker?.password}
            placeholder='Password'
          />
        </div>

        <div className='uk-margin'>
          <input
            ref={inputPhone}
            className='uk-input'
            type='phone'
            defaultValue={currentWorker?.phone}
            placeholder='Phone'
          />
        </div>

        <button onClick={() => history.goBack()} className='uk-button uk-button-default uk-margin'>
          Назад
        </button>

        <button onClick={handlerSave} className='uk-button uk-button-default uk-margin-left'>
          Сохранить
        </button>
      </div>
    </div>
  );
}

export default WorkerInfo;
