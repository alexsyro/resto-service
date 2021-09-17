import { Route, Switch } from 'react-router';
import Content from '../Content/Content';
import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path='/'>
          <Content/>
        </Route>
        <Route exact path='/about'>
          <p>О нас</p>
        </Route>
        <Route exact path='/menu'>
          <p>Меню</p>
        </Route>
        <Route exact path='/gallery'>
          <p>Галерея</p>
        </Route>
        <Route exact path='/contacts'>
          <p>Контакты</p>
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
