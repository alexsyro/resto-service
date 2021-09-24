import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { sagaLoginAC } from '../../../redux/actionCreators/sagaAC';
import styles from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';

function LoginForm() {
  // eslint-disable-next-line no-unused-vars
  const { t, i18n } = useTranslation();

  const history = useHistory()
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    const user = {
      email: email.value,
      password: password.value,
    }
    const payload = user;
    dispatch(sagaLoginAC(payload));
    localStorage.removeItem('reservation');
    history.push('/')
  };

  return (
    <div className={styles.back__block}>
      <div className={styles.black__div}>
        <form className={styles.center__form} name="loginForm" onSubmit={loginSubmit}>
          <div className={styles.group}>
            <input type='text' name='email' required />
            <span className={styles.bar}></span>
            <label>{t('login.1')}</label>
          </div>
          <div className={styles.group}>
            <input type='password' name='password' required />
            <span className={styles.bar}></span>
            <label>{t('login.2')}</label>
          </div>
          <button type="submit">{t('login.3')}</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;
