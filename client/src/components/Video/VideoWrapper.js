import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import {Videos} from './Videos/Videos';
import {Video} from './Video/Video';
import {NewVideo} from './NewVideo/NewVideo';

export const VideoWrapper = (props) => {
    const {currentVideo, setCurrentVideo} = props;

    return (
        <Switch>
            <Route path="/video/search" exact>
                <Videos setCurrentVideo={setCurrentVideo} />
            </Route>
            <Route path="/video/view" exact>
                <Video currentVideo={currentVideo}/>
            </Route>
            <Route path="/video/add">
                <NewVideo />
            </Route>
        </Switch>
    );
}