import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import {Cameras} from './Cameras/Cameras';
import {Camera} from './Camera/Camera';
import {CameraSearchVideo} from './CameraSearchVideo/CameraSearchVideo';
import {CameraVideo} from './CameraVideo/CameraVideo';

export const CameraWrapper = () => {
    const [currentCamera, setCurrentCamera] = useState(null);
    const [currentVideo, setCurrentVideo] = useState(null);

    return (
        <Switch>
            <Route path="/camera" exact>
                <Cameras setCurrentCamera={setCurrentCamera}/>
            </Route>
            <Route path="/camera/view" exact>
                <Camera currentCamera={currentCamera}/>
            </Route>
            <Route path="/camera/search">
                <CameraSearchVideo currentCamera={currentCamera} setCurrentVideo={setCurrentVideo}/>
            </Route>
            <Route path="/camera/vid">
                <CameraVideo currentCamera={currentCamera} currentVideo={currentVideo}/>
            </Route>
        </Switch>
    );
}