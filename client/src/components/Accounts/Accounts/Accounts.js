import React, {useCallback, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
import { AccountItem } from './AccountItem';

export const Accounts = () => {
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({userName: '', userType: ''});
    const [values, setValues] = useState();
    const [isInitialized, setInitialized] = useState(false);
    const message = useMessage();

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    
    useEffect( async () => {
        if (!isInitialized)
          try {
            const data = await request('/api/account?userType=admin&userName=', 'GET');
            const newValues = data.accounts.map(account => <AccountItem key={account.login} name={account.login} type={form.userType} deleteHandler={deleteHandler}/>)
            setValues(newValues);
            setInitialized(true);
          } catch (e) {
            message(e.message);
            console.log("Error: ", e.message);
          }
      }, [request, setValues, message]);
    
   
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const deleteHandler = async (event) => {
        try {
            const response = await request('/api/account', "DELETE", {login: event.target.name, type: form.userType});
            seacrhHandler();
        } catch (e) {
            message(e.message);
            console.log("Error: ", e.message);
        }
    }
    
    const seacrhHandler = async () => {
        try {
            if (!form.userType)
                throw new Error("Укажите тип аккаунта");
            const data = await request('/api/account?userType=' + form.userType + "&userName=" + form.userName, 'GET');
            const newValues = data.accounts.map(account => <AccountItem key={account.login} name={account.login} type={form.userType} deleteHandler={deleteHandler}/>)
            setValues(newValues);
        } catch (e) {
            message(e.message);
            console.log('Error:', e.message);
        }
    }

    

    return (
        <div>
        <h2>Аккаунты</h2>

            <div className="row valign-wrapper left-align">
                <div className="input-field col s5" style={{marginLeft: "10px"}}>
                    <input placeholder="Логин" name="userName" id="accounts_search" type="text" className="validate"  onChange={changeHandler} />
                </div>
            </div>

            <div>
                <p>
                    <label>
                        <input className="with-gap" name="userType" value="admin" type="radio" onChange={changeHandler}/>
                        <span>Администратор</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input className="with-gap" name="userType" value="observer" type="radio" onChange={changeHandler} />
                        <span>Наблюдатель</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input className="with-gap" name="userType" value="camera" type="radio" onChange={changeHandler} />
                        <span>Камера</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input className="with-gap" name="userType" value="output" type="radio" onChange={changeHandler} />
                        <span>Выходное устройство</span>
                    </label>
                </p>
            </div>

            <div className="row">
                <button className="btn col s2" style={{marginLeft: "10px"}} onClick={seacrhHandler}>Поиск</button>
                <Link to="/accounts/new" className="btn col offset-s1 s2">Добавить новый</Link>
            </div>

            <table className="highlight responsive-table">
                <thead>
                <tr>
                    <th>Логин</th>
                    <th>Тип аккаунта</th>
                </tr>
                </thead>

                <tbody>
                    {values}
                </tbody>
            </table>
        </div>
    );
}