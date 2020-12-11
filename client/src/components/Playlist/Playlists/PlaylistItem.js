import React from 'react';
import { Link } from 'react-router-dom';
import preview from '../../../img/preview.jpg'

export const PlaylistItem = (props) => {
    const {playlist, setCurrentPlaylist, deleteHandler} = props;

    const clickHandler = () => {
        setCurrentPlaylist(playlist);
    }

    return (
        <Link to="/playlist/view" onClick={clickHandler} className="collection-item">
            <div className="valign-wrapper">
                <img src={preview} style={{marginRight: "15px"}}/>
                <span>{playlist.description}</span>
                <button className="btn" value={playlist._id} onClick={deleteHandler}>Удалить</button>
            </div>
        </Link>
    );
}