import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Profile = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      <h2>Профиль</h2>
      <p><b>Логин: </b>{auth.userName}</p>
      <p><b>Тип аккаунта: </b>{auth.userType}</p>
    </div>
  );
}