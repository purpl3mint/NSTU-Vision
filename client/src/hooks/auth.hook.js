import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState(null);

    const login = useCallback((jwtToken, id, type, name) => {
        setToken(jwtToken);
        setUserId(id);
        setUserType(type);
        setUserName(name);

        localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id, userType: type, userName: name}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserType(null);
        setUserName(null);

        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.userType, data.userName);
        }
    }, [login]);

    return {login, logout, token, userId, userType, userName};
}