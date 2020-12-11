import React from 'react';
import preview from '../../../img/preview.jpg'

export const SelectingVideo = (props) => {
    const {name, videoId, changeHandler} = props;
    return (
        <p>
            <label>
                <div>
                    <input className="with-gap" name="videoId" value={videoId} onChange={changeHandler} type="radio"/>
                    <span>
                        <img src={preview}/>
                        <span style={{marginLeft: "15px"}}>{name}</span>
                    </span>
                </div>
            </label>
        </p>
    );
}