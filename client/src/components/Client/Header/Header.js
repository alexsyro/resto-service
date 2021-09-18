import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

function Header() {
  return (
    <>
      <input type="checkbox" id={styles.check} />
      <label for={styles.check}>
        <i className="fas fa-bars" id={styles.btn}></i>
        <i className="fas fa-times" id={styles.cancel}></i>
      </label>
      <nav className={styles.sidebar}>
        <header>Restaurant</header>
        <ul>
          <li>
            <Link className={styles.sidebar__links} to="/">
              Главная
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to="/about">
              О нас
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to="/menu">
              Меню
            </Link>
          </li>
          <li>
            <Link className={styles.sidebar__links} to="/gallery">
              Галерея
            </Link>
          </li>

          <li>
            <Link className={styles.sidebar__links} to="/contacts">
              Контакты
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.navbar__container}>
        <button className={styles.navbar__links} type="click">
          <Link className={styles.navbar_btn} to="/book">
            Забронировать
          </Link>
        </button>
        <a className={styles.navbar__links}>
          <Link to="/login">Вход</Link>
        </a>
        <a className={styles.navbar__links}>
          <Link to="/registration">Регистрация</Link>
        </a>
      </div>
    </>
  )
}

export default Header
