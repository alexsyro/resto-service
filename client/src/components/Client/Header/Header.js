import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { sagaLogoutAC } from '../../../redux/actionCreators/sagaAC';
import logo from './assets/img/logo.png';
import styles from './Header.module.scss';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(sagaLogoutAC());
    history.push('/');
  };

  i18next.t('namespace:key')

  const { t, i18n } = useTranslation();

  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <>
      <input type='checkbox' id={styles.check} />
      <label htmlFor={styles.check}>
        <i className='fas fa-bars' id={styles.btn}></i>
        <i className='fas fa-times' id={styles.cancel}></i>
      </label>
      <nav className={styles.sidebar}>
        <header><img className={styles.sidebar__logo} src={logo} alt='IMG' /></header>
        <ul>
          <li>
            <Link className={styles.sidebar__links} to='/'>
              {t('main.1')}
            </Link>
          </li>

          <li>
            <Link className={styles.sidebar__links} to='/about'>
              {t('main.2')}
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/menu'>
              {t('main.3')}
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/contacts'>
              {t('main.4')}
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.navbar__container}>
        <p className={styles.navbar__links}>
          <Link className={styles.navbar__link} to='/book'>
            {t('nav.1')}
          </Link>
        </p>
        {user.isAuth ? (
          <>
           
            {/* <li>
              <button onClick={() => handleClick('en')}>EN</button>
            </li>
            <li>
              <button onClick={() => handleClick('ru')}>RU</button>
            </li> */}
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/profile'>
                {t('nav.2')}
              </Link>
            </p>
            <p className={styles.navbar__links}>
              <button onClick={logoutHandler} type='submit' className={styles.navbar__link}>
                {t('nav.4')}
              </button>
            </p>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/cart'>
                {t('nav.5')}
                 {cart.length > 0 && cart.length}
              </Link>
            </p>
            <select className={styles.select} onChange={(event) => handleClick(event.target.value)} name="select"> 
              <option value="ru" >RU</option>
              <option value="en" >EN</option>
            </select>
          </>
        ) : (
          <>
            {/* <li>
              <button onClick={() => handleClick('en')}>EN</button>
            </li>
            <li>
              <button onClick={() => handleClick('ru')}>RU</button>
            </li> */}
           
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/login'>
                {t('nav.3')}
              </Link>
            </p>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/registration'>
                {t('nav.6')}
              </Link>
            </p>
            <select className={styles.select} onChange={(event) => handleClick(event.target.value)} name="select"> 
              <option value="ru" >RU</option>
              <option value="en" >EN</option>
            </select>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
