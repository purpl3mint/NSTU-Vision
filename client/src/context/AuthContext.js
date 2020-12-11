import {createContext} from 'react';

function noop () {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    userType: null,
    userName: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
});