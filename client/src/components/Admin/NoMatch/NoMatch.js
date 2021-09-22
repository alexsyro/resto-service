import { Link } from 'react-router-dom';
// import styles from './NoMatch.module.scss';

function NoMatch() {
  return (
    <div>
      <p>Что-то пошло не так! Вы попали на несуществующую страницу. Просьба вернуться на <Link to="/">
        <button className='uk-button uk-button-primary' type="button">
          Главную
        </button>
      </Link> страницу</p>
    </div>
  );
}

export default NoMatch;
