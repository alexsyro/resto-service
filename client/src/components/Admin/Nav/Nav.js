import React from 'react';
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav className="uk-navbar-container" uk-navbar='true'>
      <div className="uk-navbar-left">

        <ul className="uk-navbar-nav" >
          <li className="uk-active">
            <Link to="/">Main</Link>
          </li>
          <li className="uk-active">
            <Link to="/menu">Menu</Link>
          </li>
          <li className="uk-active">
            <Link to="/staff">Staff</Link>
          </li>
          <li className="uk-active">
            <Link to="/clients">Clients</Link>
          </li>
          <li className="uk-active">
            <Link to="/orders">Orders</Link>
          </li>
          <li className="uk-active">
            <Link to="/reservations">reservations</Link>
          </li>
          <li className="uk-active">
            <Link to="/logout">Logout</Link>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default Nav;
