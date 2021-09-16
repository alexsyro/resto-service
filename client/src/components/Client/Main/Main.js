import { Route, Switch } from 'react-router';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <p>It's main content section</p>
      <Switch>
        <Route exact to='/'>
          <p>Главная страница</p>
        </Route>
        <Route exact to='/about'>
          <p>О нас</p>
        </Route>
        <Route exact to='/menu'>
          <p>Меню</p>
        </Route>
        <Route exact to='/gallery'>
          <p>Галерея</p>
        </Route>
        <Route exact to='/contacts'>
          <p>Контакты</p>
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
