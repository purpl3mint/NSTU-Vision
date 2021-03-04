import React, {useEffect, useState} from 'react';
import { SearchingVideoItem } from './SearchingVideoItem';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
import { Redirect } from 'react-router-dom';

export const CameraSearchVideo = (props) => {
    const {currentCamera, setCurrentVideo} = props;
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({date: '', timeStart: '', timeEnd: ''});
    const [values, setValues] = useState(null);
    const [isInitialized, setInitialized] = useState(false);
    const message = useMessage();

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect( async () => {
        if (!isInitialized)
          try {
            const data = await request("/api/camera/" + currentCamera._id + "/query?date=" + form.date + "&timeStart=" + form.timeStart + "&timeEnd=" + form.timeEnd, "GET");
            const newValues = data.map(v => <SearchingVideoItem key={v.date} video={v} setCurrentVideo={setCurrentVideo}/>);
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

    const searchHandler = async (event) => {
        event.preventDefault();
        try {
            const data = await request("/api/camera/" + currentCamera._id + "/query?date=" + form.date + "&timeStart=" + form.timeStart + "&timeEnd=" + form.timeEnd, "GET");
            const newValues = data.map(v => <SearchingVideoItem video={v} setCurrentVideo={setCurrentVideo}/>);
            setValues(newValues);
            message(data.message);
        }catch (e) {
            message(e.message);
            console.log("Error: ", e.message);
        }
    }

    if(!currentCamera)
        return <Redirect from="/camera/search" to="/camera"/>

    return (
        <div>
            <h2>Камера {currentCamera.login}</h2>
            <p>
                Описание камеры
            </p>
            
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s9">
                            <input placeholder="Дата" type="text" name="date" onChange={changeHandler} className="datepicker" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s4">
                            <input placeholder="Время с" type="text" name="timeStart" onChange={changeHandler} className="datepicker" />
                        </div>

                        <div className="input-field col offset-s1 s4">
                            <input placeholder="Время по" type="text" name="timeEnd" onChange={changeHandler} className="datepicker" />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn col s2" onClick={searchHandler}>Поиск</button>
                    </div>
                </form>
            </div>

            <div className="collection">
                {values}
            </div>
            
        </div>
    );
}