import React, {useState, useEffect} from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

export const NewVideo = () => {
    const {loading, error, request, clearError} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({link: '', description: ''});

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
            const response = await request("/api/video", "POST", {...form});
            message(response.message);
        } catch (e) {
            message(e.message);
            console.log("Error: ", e.message);
        }
    }
    
    return (
        <div>
            <h2>Новое внешнее видео</h2>

            <div className="row">
                <form className="col s10">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Ссылка" name="link" onChange={changeHandler} id="link_newVideo" type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Описание" name="description" onChange={changeHandler} id="description_newVideo" type="text" className="validate" />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn col s6" onClick={createHandler}>Создать</button>
                    </div>
                </form>
            </div>
        </div>
    );
}