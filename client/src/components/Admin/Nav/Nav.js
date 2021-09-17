import React from 'react';
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <nav className="uk-navbar-container uk-margin">
    <div className="uk-navbar-left">

      <ul className="uk-navbar-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/restaurants">Restaurants</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>

    </div>
  </nav>
  );
}

export default Nav;
