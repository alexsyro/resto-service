import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { sagaLogoutAC } from '../../../redux/actionCreators/sagaAC';
import logo from './assets/img/logo.png'
import styles from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const history = useHistory();

  const logoutHandler = () => {
    dispatch(sagaLogoutAC());
    history.push('/');
  };
  return (
    <>
      <input type='checkbox' id={styles.check} />
      <label htmlFor={styles.check} >
        <i className='fas fa-bars' id={styles.btn}></i>
        <i className='fas fa-times' id={styles.cancel}></i>
      </label>
      <nav className={styles.sidebar}>
        <header><img className={styles.sidebar__logo} src={logo} alt='IMG'/></header>
        <ul>
          <li>
            <Link className={styles.sidebar__links} to='/'>
              Главная
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/about'>
              О нас
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/menu'>
              Меню
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to='/contacts'>
              Контакты
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.navbar__container}>
        <p className={styles.navbar__links}>
          <Link className={styles.navbar__link} to='/book'>
            Забронировать
          </Link>
        </p>
        {user.isAuth ? (
          <>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/profile'>
                Личный кабинет
              </Link>
            </p>
            <p  className={styles.navbar__links}>
              <button onClick={logoutHandler} type='submit' className={styles.navbar__link}>
                Выйти
              </button>
            </p>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/cart'>
                Корзина
              </Link>
            </p>
          </>
        ) : (
          <>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/login'>
                Вход
              </Link>
            </p>
            <p className={styles.navbar__links}>
              <Link className={styles.navbar__link} to='/registration'>
                Регистрация
              </Link>
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
