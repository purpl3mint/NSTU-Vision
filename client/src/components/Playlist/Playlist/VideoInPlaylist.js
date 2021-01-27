import React from 'react';
import { Link } from 'react-router-dom';
import preview from '../../../img/preview.jpg'

export const VideoInPlaylist = (props) => {
    const {video, setCurrentVideo, deleteHandler} = props;

    const clickHandler = (event) => {
        setCurrentVideo({link: video.link, name: video.description});
    }

    return (
        <Link to="/video/view" className="collection-item" value={video._id} onClick={clickHandler}>
            <div className="valign-wrapper">
                <div className="valign-wrapper col s9">
                    <img src={preview} style={{marginRight: "15px"}}/>
                    <span>{video.description}</span>
                </div>
                <button className="btn col offset-s1 s2" value={video._id} onClick={deleteHandler}>Удалить</button>
            </div>
        </Link>
    );
}