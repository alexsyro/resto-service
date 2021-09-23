import { Link } from 'react-router-dom'
import styles from './Main.module.scss'

function Main() {
  return (
    <div className={`${styles.container} uk-child-width-1-2@s`}>
      <Link to="/menu">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Меню</h3>
        </div>
      </Link>

      <Link to="/staff">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Персонал</h3>
        </div>
      </Link>

      <Link to="/clients">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Клиенты</h3>
        </div>
      </Link>

      <Link to="/orders">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Заказы</h3>
        </div>
      </Link>

      <Link to="/reservations">
        <div
          className={`uk-dark uk-background-muted uk-padding ${styles.block}`}
        >
          <h3>Резервирования</h3>
        </div>
      </Link>
    </div>
  )
}

export default Main
