import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Admin from './components/Admin/Admin';
import Client from './components/Client/Client';
import store from './redux/store';

const isAdmin = false;

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        {/* Условный рендеринг isAdmin. */}
        {isAdmin ? <Admin /> : <Client />}
      </Router>
    </Provider>
  </>,
  document.getElementById('root'),
);
