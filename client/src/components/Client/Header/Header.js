import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

function Header() {
  return (
    <nav className={styles.nav__container}>
      <div>
        <img className={styles.logo__picture}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/BMW_logo_%28gray%29.svg/1024px-BMW_logo_%28gray%29.svg.png"
          alt="logo"
        />
      </div>
      <div>
        <p>
          <Link to="/">Главная</Link>
        </p>
        <p>
          <Link to="/menu">Меню</Link>
        </p>
        <p>
          <Link to="/gallery">Галерея</Link>
        </p>
        <p>
          <Link to="/about">О нас</Link>
        </p>
        <p>
          <Link to="/contacts">Контакты</Link>
        </p>
      </div>
      <div>
        <p>
          <Link to="/login">Вход</Link>
        </p>
        <p>
          <Link to="/registration">Регистрация</Link>
        </p>
      </div>
    </nav>
  )
}

export default Header
