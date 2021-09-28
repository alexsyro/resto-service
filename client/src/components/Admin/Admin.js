import Main from './Main/Main';
import styles from './Admin.module.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders';
import OrderInfo from './Orders/OrderInfo';
import Staff from './Staff/Staff';
import WorkerInfo from './Staff/WorkerInfo';
import AddWorkerForm from './Staff/AddWorkerForm';
import UsersPage from './UsersPage/UsersPage'
import ClientInfo from './UsersPage/ClientInfo';
import AddClientForm from './UsersPage/AddClientForm';
import Reserve from '../Admin/Reserve/Reserve';
import ReservationInfo from '../Admin/Reserve/ReservationInfo';
import NoMatch from './NoMatch/NoMatch'

function Admin() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
          <Route path='/menu'>
            <Menu />
          </Route>
          <Route path='/orders/:id' exact>
            <OrderInfo />
          </Route>
          <Route path='/reservations/:id' exact>
            <ReservationInfo />
          </Route>
          <Route path='/orders' exact>
            <Orders />
          </Route>
          <Route path='/reservations' exact>
            <Reserve />
          </Route>
          <Route exact path='/staff/new'>
            <AddWorkerForm />
          </Route>
          <Route path='/staff/:staffId' exact>
            <WorkerInfo />
          </Route>
          <Route path='/staff' exact>
            <Staff />
          </Route>
          <Route path='/clients' exact>
            <UsersPage />
          </Route>
          <Route exact path='/clients/new'>
            <AddClientForm />
          </Route>
          <Route path='/clients/:clientId' exact>
            <ClientInfo />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Admin;
