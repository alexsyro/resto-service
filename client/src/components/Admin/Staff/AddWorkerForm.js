import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { GET_STAFF } from '../../../redux/actionTypes/actionType';
import styles from './AddWorkerForm.module.scss';

const REGEXP_PHONE_VALIDATION = /[-+() ]*/gs;
const { REACT_APP_URL } = process.env;

const checkCorrectNumber = (string) => {
  const normilize = string.replace(REGEXP_PHONE_VALIDATION, '');
  return normilize.length === 11;
};

function AddWorkerForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [img, setImg] = useState(null);

  const posts = useSelector((state) => state.staffReducer.positions);
  console.log(posts, 'POSTS');

  const fileUpload = (event) => {
    const [file] = event.target.files;
    if (file.size > 1000000) {
      alert(`Слишком большой файл, вы загрузили ${file.size / 1000} кб, максимум 1 МБ`);
      event.target.value = '';
    } else {
      let url = URL.createObjectURL(file);
      setImg(url);
    }
  };

  const addWorker = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const [file] = e.target.file.files;
    const { action, method, name, login, password, phone, postId } = e.target;
    if (checkCorrectNumber(phone.value)) {
      formData.append('file', file);
      formData.append('name', name.value);
      formData.append('login', login.value);
      formData.append('password', password.value);
      formData.append('phone', phone.value);
      formData.append('postId', postId.value);
      fetch(action, {
        method,
        credentials: 'include',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => dispatch({ type: GET_STAFF, action: data }));
    } else {
      alert('Не правильный формат телефона');
    }
  };

  return (
    <>
      <div className={styles.form__block}>
        <form onSubmit={addWorker}
          action={`${REACT_APP_URL}api/staff/new`}
          method='POST'
          name='addWorkerForm'
          className={styles.form}>
          <fieldset className="uk-fieldset">

            <legend className="uk-legend" style={{ color: 'white' }}>Добавление сотрудника</legend>

            <div className="uk-margin">
              <input className="uk-input" type='text' name='name' placeholder="Имя сотрудника" required />
            </div>
            <div className={`uk-margin`}>
              <select className={`uk-select`} name='postId'>
                {posts.map((post) => (
                  <option value={post.id}>{post.name}</option>
                ))}
              </select>
            </div>
            <div className="uk-margin">
              <input className="uk-input" type='phone' name='phone' placeholder='Номер телефона' required />
            </div>
            <div className="uk-margin">
              <input className="uk-input" type='text' name='login' placeholder='Логин сотрудника' required />
            </div>
            <div className="uk-margin">
              <input className="uk-input" type='text' name='password' placeholder='Пароль сотрудника' required />
            </div>
            <div className={styles.margin__left}>
              <img src={img} width='250' height='200' alt='IMG' />
              <input onChange={fileUpload} type='file' name='file' />
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
    </>
  );
}

export default AddWorkerForm;
