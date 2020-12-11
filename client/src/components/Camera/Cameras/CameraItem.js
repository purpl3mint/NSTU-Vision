import React from 'react';
import { Link } from 'react-router-dom';
import preview from '../../../img/preview.jpg'

export const CameraItem = (props) => {
    const {camera, setCurrentCamera} = props;
    const {login} = camera;

    const clickHandler = (event) => {
      setCurrentCamera(camera);
    }

    return (
        <Link to='/camera/view' className="collection-item" onClick={clickHandler}>
          <div className="valign-wrapper">
            <img src={preview} style={{marginRight: "15px"}}/>
            <span>{login}</span>
          </div>
        </Link>
    );
}