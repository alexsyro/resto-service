import React from 'react';
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav className="uk-navbar-container uk-margin">
    <div className="uk-navbar-left">

      <ul className="uk-navbar-nav">
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>

    </div>
  </nav>
  );
}

export default Nav;
