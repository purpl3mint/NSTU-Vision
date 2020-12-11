import React from 'react';
import { Link } from 'react-router-dom';
import preview from '../../../img/preview.jpg';

export const VideoItem = (props) => {
    const {video, setCurrentVideo, deleteHandler} = props;
    const {description, link, _id} = video;

    const clickHandler = () => {
        setCurrentVideo({link, name: description});
    }

    return (
        <Link to='/video/view' className="collection-item" onClick={clickHandler}>
            <div className="valign-wrapper">
                <img src={preview} style={{marginRight: "15px"}}/>
                <span>{description}</span>
                <button className="btn" value={_id} onClick={deleteHandler}>Удалить</button>
            </div>
        </Link>
    );
}

