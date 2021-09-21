import { Route, Switch, Link } from 'react-router-dom';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={`${styles.container} uk-button-group `}>
      <Link to="/menu">
        <button className='uk-button uk-button-primary' type="button">
          menu
        </button>
      </Link>

      <Link to="/orders">
        <button className='uk-button uk-button-primary' type="button">
          orders
        </button>
      </Link>

      <Link to="/reservations">
        <button className='uk-button uk-button-primary' type="button">
          reservations
        </button>
      </Link>

      <Link to="/staff">
        <button className='uk-button uk-button-primary' type="button">
          staff
        </button>
      </Link>
    </div>
  );
}

export default Main;
