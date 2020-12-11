import React, {useEffect, useState} from 'react';
import preview from '../../../img/preview.jpg'
import { SelectingVideo } from './SelectingVideo';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';
import { Redirect } from 'react-router-dom';

export const AddVideoToPlaylist = (props) => {
  const {currentPlaylist} = props;
  const {loading, error, request, clearError} = useHttp();
  const [values, setValues] = useState(null);
  const [form, setForm] = useState({videoId: ''});
  const message = useMessage();
  const [isInitialized, setInitialized] = useState(false);

  useEffect( () => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( async () => {
    if (!isInitialized)
      try {
        const data = await request("/api/video?videoName=", "GET");
        const newValues = data.map(v => <SelectingVideo name={v.description} videoId={v._id} changeHandler={changeHandler}/>);
        setValues(newValues);
        setInitialized(true);
      } catch (e) {
        message(e.message);
        console.log("Error: ", e.message);
      }
  }, [request, setValues, message]);

  const changeHandler = async (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const searchHandler = async () => {
    try {
      const data = await request("/api/video?videoName=", "GET");
      const newValues = data.map(v => <SelectingVideo name={v.description} videoId={v._id} changeHandler={changeHandler}/>);
      setValues(newValues);
    } catch (e) {
      message(e.message);
      console.log('Error:', e.message);
    }
  }

  const pushHandler = async () => {
    try {
      const response = await request("/api/playlist/" + currentPlaylist._id, "PUT", {...form});
      message(response.message);
    } catch (e) {
      message(e.message);
      console.log('Error:', e.message);
    }
  }

  if (!currentPlaylist)
    return <Redirect from="/playlist/add" to="/playlist/all"/>


  return (
    <div>
        <h2>Добавление видео в {currentPlaylist.description}</h2>

        <div className="row valign-wrapper left-align">
            <div class="input-field col s5" style={{marginLeft: "10px"}}>
                <input placeholder="Название видео" id="playlist_search" type="text" class="validate" />
            </div>
            <button className="btn col offset-s1 s2" onClick={searchHandler}>Поиск</button>
            <button className="btn col offset-s1 s2" onClick={pushHandler}>Добавить видео</button>
        </div>

        <div className="row">
            {values}
        </div>
    </div>
  );
}

/*
<SelectingVideo name="Video 1"/>
            <SelectingVideo name="Video 2"/>
            <SelectingVideo name="Video 3"/>
            <SelectingVideo name="Video 4"/>
            <SelectingVideo name="Video 5"/>
*/