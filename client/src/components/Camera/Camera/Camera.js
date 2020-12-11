import React from 'react';
import ReactPlayer from 'react-player';
import { Link, Redirect } from 'react-router-dom';

export const Camera = (props) => {
  const {currentCamera} = props;

  if (!currentCamera)
    return <Redirect from="/camera/view" to="/camera"/>

  return (
    <div>
        <h2>Камера {currentCamera.login}</h2>
        <p>
            Описание камеры
        </p>
        <div style={{marginBottom: "15px"}}>
            <h4>Прямой эфир</h4>
            <ReactPlayer url="https://www.youtube.com/watch?v=ztzq05IzYds" controls = {true}/>
        </div>
        <div className="row">
            <Link to="/camera/search" className="btn col s5">Поиск записи видео</Link>
        </div>
    </div>
  );
}