import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ComponentSwitcher from './components/ComponentSwitcher';
import ScrollToTop from './components/ScrollRestoration/ScrollRestoration';

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <ComponentSwitcher />
      </Router>
    </Provider>
  </>,
  document.getElementById('root'),
);
