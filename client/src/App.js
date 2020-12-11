import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from './routes'
import 'materialize-css';
import {Header} from './common/Header';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

function App() {
  const {token, login, logout, userId, userType, userName} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{token, userId, userType, userName, login, logout, isAuthenticated}}>
      <Router>
        <Header />
        <div className="">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
