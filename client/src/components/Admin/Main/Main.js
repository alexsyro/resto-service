import { Link } from 'react-router-dom';
import styles from './Main.module.scss';
import Icons from 'react-uikit-icons';


function Main() {
  return (
    <div className={`${styles.container} uk-child-width-1-2@s`} uk-grid>
      <Link to="/menu">
        <div>
          <div className={`uk-dark uk-background-muted uk-padding ${styles.block}`}>
            <h3>Меню</h3>
          </div>
        </div>
      </Link>

      <Link to="/staff">
        <div>
          <div className={`uk-dark uk-background-muted uk-padding ${styles.block}`}>
            <h3>Персонал</h3>
          </div>
        </div>
      </Link>

      <Link to="/clients">
        <div>
          <div className={`uk-dark uk-background-muted uk-padding ${styles.block}`}>
            <h3>Клиенты</h3>
          </div>
        </div>
      </Link>

      <Link to="/orders">
        <div>
          <div className={`uk-dark uk-background-muted uk-padding ${styles.block}`}>
            <h3>Заказы</h3>
          </div>
        </div>
      </Link>


      <Link to="/reservations">
        <div>
          <div className={`uk-dark uk-background-muted uk-padding ${styles.block}`}>
            <h3>Резервирования</h3>
          </div>
        </div>
      </Link>

    </div>
  );
}

export default Main;
