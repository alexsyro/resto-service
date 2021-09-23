import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sagaRegAC } from '../../../redux/actionCreators/sagaAC';
import styles from './RegForm.module.scss';
import { useTranslation } from 'react-i18next';


const checkEmptyFields = (fields) => fields.every((field) => field.value.length);

function RegForm() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const regSubmit = (e) => {
    e.preventDefault();
    const { action, method, email, name, phone, password } = e.target;
    const fields = [email, password, phone];
    const notEmpty = checkEmptyFields(fields);
    if (notEmpty) {
      const user = {
        action,
        method,
        email: email.value,
        name: name.value,
        phone: phone.value,
        password: password.value,
      };
      const payload = user;
      dispatch(sagaRegAC(payload));
      history.push('/');
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <div className={styles.back__block}>
      <div className={styles.black__div}>
        <form className={styles.center__form} name='regForm' onSubmit={regSubmit}>
          <div className={styles.group}>
            <input type='text' name='name' required />
            <span className={styles.bar}></span>
            <label>{t('reg.1')}</label>
          </div>
          <div className={styles.group}>
            <input type='text' name='email' required />
            <span className={styles.bar}></span>
            <label>{t('reg.2')}</label>
          </div>
          <div className={styles.group}>
            <input type='phone' name='phone' required />
            <span className={styles.bar}></span>
            <label>{t('reg.3')}</label>
          </div>
          <div className={styles.group}>
            <input type='password' name='password' required />
            <span className={styles.bar}></span>
            <label>{t('reg.4')}</label>
          </div>
          <button type='submit'>{t('reg.5')}</button>
        </form>
      </div>
    </div>
  );
}

export default RegForm;
