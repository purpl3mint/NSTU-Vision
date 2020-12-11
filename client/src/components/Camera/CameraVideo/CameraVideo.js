import React from 'react';
import ReactPlayer from 'react-player';
import { Redirect } from 'react-router-dom';

export const CameraVideo = (props) => {
  const {currentCamera, currentVideo} = props;

  if (!currentCamera || !currentVideo)
    return <Redirect from="/camera/vid" to="/camera"/>

  return (
    <div>
        <h2>Видеозапись камеры {currentCamera.login}</h2>
        <p>
            <b>Дата: </b><span>{currentVideo.date}</span><br/>
            <b>Начало записи: </b><span>{currentVideo.timeStart}</span><br/>
            <b>Конец записи: </b><span>{currentVideo.timeEnd}</span><br/>
        </p>
        <ReactPlayer url="https://www.youtube.com/watch?v=ztzq05IzYds" controls = {true}/>
    </div>
  );
}