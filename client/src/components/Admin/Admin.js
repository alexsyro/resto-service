import Main from './Main/Main';
import SideMenu from './SideMenu/SideMenu';
import styles from './Admin.module.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Menu from './Menu/Menu';

function Admin() {
  return (
    <div className={styles.container}>

      <Header />
      <SideMenu />

      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/menu" exact>
          <Menu />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
        <Route path="/staff" exact>
          <Staff />
        </Route>
      </Switch>
      <Footer />


    </div>
  );
}

export default Admin;
