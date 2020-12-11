import React from 'react';
import { Link } from 'react-router-dom';
import preview from '../../../img/preview.jpg'

export const SearchingVideoItem = (props) => {
    const {video, setCurrentVideo} = props;
    const {date, timeStart, timeEnd} = video;

    const clickHandler = (event) => {
        setCurrentVideo(video);
    }

    return (
        <Link to="/camera/vid" onClick={clickHandler} className="collection-item">
            <div className="valign-wrapper">
                <img src={preview} style={{marginRight: "15px"}}/>
                <div>
                    <p>Дата: {date}</p>
                    <p>Время: {timeStart} - {timeEnd}</p>
                </div>
            </div>
        </Link>
    );
}