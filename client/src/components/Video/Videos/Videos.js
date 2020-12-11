import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VideoItem } from './VideoItem';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

export const Videos = (props) => {
  const {setCurrentVideo} = props;
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();
  const [values, setValues] = useState(null);
  const [isInitialized, setInitialized] = useState(false);
  const [form, setForm] = useState({videoName: ''});

  useEffect( () => {
    message(error);
    clearError();
    }, [error, message, clearError]);

  useEffect( async () => {
    if (!isInitialized)
      try {
        const data = await request('/api/video?videoName=', 'GET');
        const newValues = data.map(v => <VideoItem video={v} setCurrentVideo={setCurrentVideo} deleteHandler={deleteHandler}/>);
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

  const searchHandler = async () => {
    try {
      const data = await request('/api/video?videoName=' + form.videoName, 'GET');
      const newValues = data.map(v => <VideoItem video={v} setCurrentVideo={setCurrentVideo} deleteHandler={deleteHandler}/>);
      setValues(newValues);
    } catch (e) {
      message(e.message);
      console.log("Error: ", e.message);
    }
  }

  const deleteHandler = async (event) => {
    event.preventDefault();
    try {
      const videoId = event.target.value;
      const response = await request('/api/video', 'DELETE', {videoId});
      message(response.message);
    } catch (e) {
      message(e.message);
      console.log("Error: ", e.message);
    }
  }

  return (
    <div>
      <h2>Внешние видео</h2>

        <div className="row valign-wrapper left-align">
            <div className="input-field col s5" style={{marginLeft: "10px"}}>
                <input placeholder="Название видео" name="videoName" onChange={changeHandler} id="videos_search" type="text" className="validate" />
            </div>
            <button className="btn col offset-s1 s2" onClick={searchHandler}>Поиск</button>
            <Link to="/video/add" className="btn col offset-s1 s2">Добавить новое</Link>
        </div>

        <div className="collection">
            {values}
        </div>
    </div>
  );
}