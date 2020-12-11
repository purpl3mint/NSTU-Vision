import React from 'react';
import ReactPlayer from 'react-player';
import { Redirect } from 'react-router-dom';

export const Video = (props) => {
  const {currentVideo} = props;
  
  if (!currentVideo)
    return <Redirect from="/video/view" to="/video/search"/>;

  if (!currentVideo.name)
    currentVideo.name = "Внешнее видео";

  return (
    <div>
        <h2>{currentVideo.name}</h2>
        <ReactPlayer url={currentVideo.link} controls = {true}/>
    </div>
  );
}

/*
<ReactPlayer url="http://media.w3.org/2010/05/bunny/movie.mp4" controls = {true}/>
*/