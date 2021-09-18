import Main from './Main/Main';
import SideMenu from './SideMenu/SideMenu';
import styles from './Admin.module.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Menu from './Menu/Menu';
import Orders from './Orders/Orders'
import OrderInfo from './Orders/OrderInfo';
import Staff from './Staff/Staff'
import SaladsInfo from './Menu/items/Salads/SaladsInfo';
import WorkerInfo from './Staff/WorkerInfo';
import AddCocktailForm from './Menu/items/Cocktails/AddCocktailForm';
import AddDessertForm from './Menu/items/Desserts/AddDessertForm';
import AddPastaForm from './Menu/items/Pasta/AddPastaForm';
import AddPizzaForm from './Menu/items/Pizza/AddPizzaForm';
import AddSaladForm from './Menu/items/Salads/AddSaladForm';
import AddSoupForm from './Menu/items/Soups/AddSoupForm';
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
          <Route path="/menu/addcocktail" exact>
            <AddCocktailForm />
          </Route>
          <Route path="/menu/adddeserts" exact>
            <AddDessertForm />
          </Route>
          <Route path="/menu/addpasta" exact>
            <AddPastaForm />
          </Route>
          <Route path="/menu/addpizza" exact>
            <AddPizzaForm />
          </Route>
          <Route path="/menu/addsalad" exact>
            <AddSaladForm />
          </Route>
          <Route path="/menu/addsoup" exact>
            <AddSoupForm />
          </Route>
          <Route path="/orders" exact>
            <Orders />
          </Route>
          <Route path="/orders/edit/:id" exact>
            <OrderInfo />
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
