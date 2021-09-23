import React , { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ComponentSwitcher from './components/ComponentSwitcher';
import './i18next';
import ScrollToTop from './components/ScrollRestoration/ScrollRestoration';

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
      <Suspense fallback="loading">
        <ScrollToTop />
        <ComponentSwitcher />
        </Suspense>
      </Router>
    </Provider>
  </>,
  document.getElementById('root'),
);
