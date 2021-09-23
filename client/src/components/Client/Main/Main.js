import { Route, Switch } from 'react-router';
import Content from '../Content/Content';
import styles from './Main.module.scss';
import LoginForm from '../LoginForm/LoginForm';
import RegForm from '../RegForm/RegForm';
import About from '../About/About';
import Contacts from '../Contacts/Contacts';
import Reservation from '../Reservation/Reservation';
import Cart from '../Cart/Cart';
import Payment from '../Payment/Payment';
import Menu from '../Menu/Menu';
import SubcategoryItemClient from '../SubcategoryItem/SubcategoryItemClient';
import Profile from '../Profile/Profile';
import NoMatch from '../NoMatch/NoMatch';

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
        <Route path='/menu' exact>
          <Menu />
        </Route>
        <Route path='/menu/subcategory/:categoryId' exact>
          <SubcategoryItemClient />
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
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/book'>
          <Reservation />
        </Route>
        <Route exact path='/cart'>
          <Cart />
        </Route>
        <Route exact path='/payment'>
          <Payment />
        </Route>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
