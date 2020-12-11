import React, {useState, useEffect, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';
import { useMessage } from '../../hooks/message.hook';

export const Auth = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({login: '', password: ''});
  const {loading, error, request, clearError} = useHttp();

  useEffect( () => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId, data.userType, form.login);
    } catch (e) {
      console.log('Error:', e.message);
    }
  }

  return (     
  <div>   
    <div className="row" style={{textAlign: 'center'}}>
      <div className="col s6 offset-s3">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            
            
            <div className="input-field">
              <input id="login" name="login" type="text" className="validate" onChange={changeHandler}/>
              <label htmlFor="login">Логин</label>
            </div>

            <div className="input-field">
              <input id="password" name="password" type="password" className="validate" onChange={changeHandler} />
              <label htmlFor="password">Пароль</label>
            </div>

          </div>
          <div className="card-action">
            <button className="btn" onClick={loginHandler} disabled={loading}>Войти</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}