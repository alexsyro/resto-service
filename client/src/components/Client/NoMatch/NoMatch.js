import { Link } from 'react-router-dom';
import styles from './NoMatch.module.scss';

function NoMatch() {
  return (
    <div className={styles.container}>
      <p>Что-то пошло не так! Вы попали на несуществующую страницу</p>
      <p>Просьба вернуться на <Link to="/">
        <button className={styles.button} type="button">
          Главную
        </button>
      </Link> страницу</p>
    </div>
  );
}

export default NoMatch;
