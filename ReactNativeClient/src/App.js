import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import Navigation from './Navigation';

const store = configureStore();

export default () => (
  <Provider store={store}>
    <Navigation />
  </Provider>
);
