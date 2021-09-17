import { Route, Switch, Link } from 'react-router-dom';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <Link to="/menu">
        <button type="button">
          menu
        </button>
      </Link>

      <Link to="/orders">
        <button type="button">
          orders
        </button>
      </Link>

      <Link to="/staff">
        <button type="button">
          staff
        </button>
      </Link>
    </div>
  );
}

export default Main;
