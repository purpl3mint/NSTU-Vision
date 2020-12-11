import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Header = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();

    const logoutHandler = event => {
      event.preventDefault();
      auth.logout();
      history.push('/');
    }


    if (!auth.isAuthenticated) {
      return (
      <nav className="teal lighten-2" style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo">NSTU-Vison</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/">Вход</a></li>
          </ul>
        </div>
      </nav>
      );
    }

    return (
      <nav className="teal lighten-2" style={{paddingLeft: '5%', paddingRight: '5%'}}>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo">NSTU-Vison</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/" onClick={logoutHandler}>Выход</NavLink></li>
          </ul>
        </div>
      </nav>
            
    );

}