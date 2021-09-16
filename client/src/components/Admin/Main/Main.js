import { Route, Switch } from 'react-router';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route to='/'>
          <p>Главная страница админки</p>
        </Route>
        <Route to='/???'>
          <p>Управление чем-то :)</p>
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
