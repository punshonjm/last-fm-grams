import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

import './App.css';
import MainApp from './components/MainApp';
import { AppContextProvider, useAppContext } from './components/MainApp/appContext';
import Login from './components/Login';

function App() {
  const { user } = useAppContext();

  if (!user) {
    return <Login />;
  }

  return <MainApp />;
}

export default () => (
  <AppContextProvider>
    <Router basename="/">
      <App />
    </Router>
  </AppContextProvider>
);
