import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import useLocalStorage from './hooks/useLocalStorage';
import HomePage from './pages/HomePage';

const App = () => {
  useLocalStorage(); // Initialize localStorage persistence

  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;