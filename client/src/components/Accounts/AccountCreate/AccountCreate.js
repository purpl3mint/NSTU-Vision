import React, {useCallback, useEffect, useState} from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

export const AccountCreate = () => {
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({userName: '', userType: ''});
    const message = useMessage();

    useEffect( () => {
        message(error);
        clearError();
        }, [error, message, clearError]);
    

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const createHandler = async (e) => {
        e.preventDefault();
        try {
            console.log("Type: ", form.type);
            const response = await request("/api/account", "POST", {...form});
            message(response.message);
        } catch (e) {
            message(e.message);
            console.log("Error: ", e.message);
        }
    }

    return (
        <div>
            <h2>Создание аккаунта</h2>
            <div className="row">
                <form className="col s10">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Логин" onChange={changeHandler} name="login" id="login_newAccount" type="text" className="validate" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Пароль" onChange={changeHandler} name="password" id="password_newAccount" type="password" className="validate" />
                        </div>
                    </div>

                    <div className="row">
                        <p>
                            <label>
                                <input className="with-gap" onChange={changeHandler} value="admin" name="type" type="radio"/>
                                <span>Администратор</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" onChange={changeHandler} value="observer" name="type" type="radio" />
                                <span>Наблюдатель</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" onChange={changeHandler} value="camera" name="type" type="radio"  />
                                <span>Камера</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input className="with-gap" onChange={changeHandler} value="output" name="type" type="radio" />
                                <span>Выходное устройство</span>
                            </label>
                        </p>
                    </div>
                    
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="ID потокового видео(только для камер)" onChange={changeHandler} name="streamID" id="streamID_newAccount" type="text" className="validate" />
                        </div>
                    </div>

                    <div className="row">
                        <button className="btn col s4" onClick={createHandler} style={{marginLeft: "10px"}}>Создать</button>
                    </div>

                </form>
            </div>
        </div>
    );
}