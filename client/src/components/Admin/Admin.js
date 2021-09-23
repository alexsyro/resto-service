import Main from './Main/Main';
import SideMenu from './SideMenu/SideMenu';
import styles from './Admin.module.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
// import Footer from './Footer/Footer';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders';
import OrderInfo from './Orders/OrderInfo';
import Staff from './Staff/Staff';
import WorkerInfo from './Staff/WorkerInfo';
import AddWorkerForm from './Staff/AddWorkerForm';
import SubcategoryItem from './Menu/SubcategoryItem/SubcategoryItem';
import DishInfo from './Menu/DishInfo/DishInfo';
import AddDishForm from './Menu/AddDishForm/AddDishForm';
import UsersPage from './UsersPage/UsersPage'
import ClientInfo from './UsersPage/ClientInfo';
import AddClientForm from './UsersPage/AddClientForm';
import Reservation from '../Admin/Reservations/Reservations';
import Reserve from '../Admin/Reserve/Reserve';
import ReservationInfo from '../Admin/Reservations/ReservationInfo';
import NoMatch from './NoMatch/NoMatch'
import ChooseDate from '../Client/ChooseDate/ChooseDate';

function Admin() {
  return (
    <div className={styles.container}>
      <Router>
        <Header />
        {/* <SideMenu /> */}
        <Switch>
          <Route path='/' exact>
            <Main />
          </Route>
          <Route path='/menu/position/:dishId' exact>
            <DishInfo />
          </Route>
          <Route path='/menu/subcategory/:categoryId' exact>
            <SubcategoryItem />
          </Route>
          <Route path='/menu/subcategory/:categoryId/new' exact>
            <AddDishForm />
          </Route>
          <Route path='/menu' exact>
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
            {/* <Reservation /> */}
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
          <Route path='/clients/:clientId' exact>
            <ClientInfo />
          </Route>
          <Route exact path='/clients/new'>
            <AddClientForm />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default Admin;
