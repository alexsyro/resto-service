import { Route, Switch } from 'react-router';
import Content from '../Content/Content';
import styles from './Main.module.scss';
import LoginForm from '../LoginForm/LoginForm';
import RegForm from '../RegForm/RegForm';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import Reservation from '../Reservation/Reservation';
import Gallery from '../Gallery/Gallery';
import Cart from '../Cart/Cart';

function Main() {
  return (
    <div className={styles.container}>
      <Switch>
        <Route exact path='/'>
          <Content />
        </Route>
        <Route exact path='/about'>
          <About />
        </Route>
        <Route exact path='/menu'>
          {/* <p>Меню</p> */}
        </Route>
        <Route exact path='/gallery'>
          <Gallery />
        </Route>
        <Route exact path='/contacts'>
          <Contacts />
        </Route>
        <Route exact path='/login'>
          <LoginForm />
        </Route>
        <Route exact path='/registration'>
          <RegForm />
        </Route>
        <Route exact path='/book'>
          <Reservation />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
