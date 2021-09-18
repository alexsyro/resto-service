import Main from './Main/Main';
import SideMenu from './SideMenu/SideMenu';
import styles from './Admin.module.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders'
import Staff from './Staff/Staff'
import Order from './Order/Order';
import SaladsInfo from './Menu/items/Salads/SaladsInfo';
import WorkerInfo from './Staff/WorkerInfo';
import AddWorkerForm from './Staff/AddWorkerForm';

function Admin() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <SideMenu />

        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route exact path="/menu/:id">
            <SaladsInfo />
          </Route>
          <Route path="/menu" exact>
            <Menu />
          </Route>
          <Route path="/orders" exact>
            <Orders />
          </Route>
          <Route path="/staff/:id" exact>
            <WorkerInfo />
          </Route>
          <Route path="/staff" exact>
            <Staff />
          </Route>
          <Route path="/staff/addworker" exact>
            <AddWorkerForm />
          </Route>
        </Switch>
        <Footer />
      </Router >
    </div>
  );
}

export default Admin;
