import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import preview from '../../../img/preview.jpg'
import { VideoInPlaylist } from './VideoInPlaylist';
import { useHttp } from '../../../hooks/http.hook';
import { useMessage } from '../../../hooks/message.hook';

export const Playlist = (props) => {
  const {currentPlaylist, setCurrentVideo} = props;
  const [form, setForm] = useState({videoName: ''});
  const [values, setValues] = useState(null);
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();

  if (!currentPlaylist)
    return <Redirect from="/playlist/view" to="/playlist/all"/>

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const deleteHandler = async (event) => {
      event.preventDefault();
      try {
        const response = await request('/api/playlist/' + currentPlaylist._id + "/" + event.target.value, "DELETE");
        message(response.message);
      } catch (e) {
        message(e.message);
        console.log("Error: ", e.message);
      }
  }

  const searchHandler = (event) => {
    event.preventDefault();
    try {
      const newValues = currentPlaylist.videos.map(v => {
        if (v.description.indexOf(form.videoName) >= 0)
          return <VideoInPlaylist video={v} setCurrentVideo={setCurrentVideo} deleteHandler={deleteHandler}/>;
      });
      setValues(newValues);
    } catch (e) {
      message(e.message);
      console.log("Error: ", e.message);
    }
  }


  if (!values) {
    const newValues = currentPlaylist.videos.map(v => <VideoInPlaylist video={v} setCurrentVideo={setCurrentVideo} deleteHandler={deleteHandler}/>);
    setValues(newValues);
  }

  return (
    <div>
        <h2>Плейлист {currentPlaylist.description}</h2>

        <div className="row valign-wrapper left-align">
            <div className="input-field col s5" style={{marginLeft: "10px"}}>
                <input placeholder="Название видео" name="videoName" onChange={changeHandler} id="playlist_search" type="text" className="validate" />
            </div>
            <button className="btn col offset-s1 s2" onClick={searchHandler}>Поиск</button>
            <Link to="/playlist/add" className="btn col offset-s1 s2">Добавить видео</Link>
        </div>

        <div class="collection">
            {values}
        </div>
    </div>
  );
}