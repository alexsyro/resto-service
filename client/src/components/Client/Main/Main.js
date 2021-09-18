import { Route, Switch } from 'react-router';
import Content from '../Content/Content';
import styles from './Main.module.scss';
import LoginForm from '../LoginForm/LoginForm';
import RegForm from '../RegForm/RegForm';

function Main() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path='/'>
          <Content />
        </Route>
        <Route exact path='/about'>
          {/* <p>О нас</p> */}
        </Route>
        <Route exact path='/menu'>
          {/* <p>Меню</p> */}
        </Route>
        <Route exact path='/gallery'>
          {/* <p>Галерея</p> */}
        </Route>
        <Route exact path='/contacts'>
          {/* <p>Контакты</p> */}
        </Route>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/registration'>
          <RegForm />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
