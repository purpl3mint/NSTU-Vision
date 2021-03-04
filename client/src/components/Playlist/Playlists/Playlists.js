import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { PlaylistItem } from './PlaylistItem';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

export const Playlists = (props) => {
  const {setCurrentPlaylist} = props;
  const {loading, error, request, clearError} = useHttp();
  const [values, setValues] = useState(null);
  const message = useMessage();
  const [isInitialized, setInitialized] = useState(false);
  const [form, setForm] = useState({playlistName: ''});

  useEffect( () => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect( async () => {
    if (!isInitialized)
      try {
        const data = await request('/api/playlist?playlistName=', 'GET');
        const newValues = data.result.map(p => <PlaylistItem key={p.description} playlist={p} setCurrentPlaylist={setCurrentPlaylist} deleteHandler={deleteHandler}/>);
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
    event.preventDefault();
    try {
      const playlistId = event.target.value;
      const data = await request('/api/playlist', 'DELETE', {playlistId});
      message(data.message);
      searchHandler();
    } catch (e) {
      message(e.message);
      console.log('Error:', e.message);
    }
  }
  
  const searchHandler = async () => {
    try {
      const data = await request('/api/playlist?playlistName=' + form.playlistName, 'GET');
      const newValues = data.result.map(p => <PlaylistItem key={p.description} playlist={p} setCurrentPlaylist={setCurrentPlaylist} deleteHandler={deleteHandler}/>);
      setValues(newValues);
    } catch (e) {
      message(e.message);
      console.log('Error:', e.message);
    }
  } 

  return (
    <div>
      <h2>Плейлисты</h2>

        <div className="row valign-wrapper left-align">
            <div className="input-field col s5" style={{marginLeft: "10px"}}>
                <input placeholder="Название плейлиста" name="playlistName" onChange={changeHandler} id="playlists_search" type="text" className="validate" />
            </div>
            <button className="btn col offset-s1 s2" onClick={searchHandler}>Поиск</button>
            <Link to="/playlist/new" className="btn col offset-s1 s2">Добавить новый</Link>
        </div>

        <div className="collection">
            {values}
        </div>

    </div>
  );
}