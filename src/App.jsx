// src/App.jsx
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './app/store';
import useLocalStorage from './hooks/useLocalStorage';
import { fetchCurrentUser } from './features/auth/authSlice';
import HomePage from './pages/HomePage';

const AppWrapper = () => {
  const dispatch = useDispatch();

  useLocalStorage();

  useEffect(() => {
    dispatch(fetchCurrentUser()); // ✅ auto-login if session cookie exists
  }, [dispatch]);

  return <HomePage />;
};

const App = () => (
  <Provider store={store}>
    <AppWrapper />
  </Provider>
);

export default App;
