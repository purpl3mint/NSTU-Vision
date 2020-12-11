import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import {Playlists} from './Playlists/Playlists';
import {Playlist} from './Playlist/Playlist';
import {AddVideoToPlaylist} from './AddVideoToPlaylist/AddVideoToPlaylist';
import {NewPlaylist} from './NewPlaylist/NewPlaylist';

export const PlaylistWrapper = (props) => {
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const {currentVideo, setCurrentVideo} = props;

    return (
        <Switch>
            <Route path="/playlist/all" exact>
                <Playlists setCurrentPlaylist={setCurrentPlaylist}/>
            </Route>
            <Route path="/playlist/view" exact>
                <Playlist currentPlaylist={currentPlaylist} setCurrentVideo={setCurrentVideo}/>
            </Route>
            <Route path="/playlist/add" exact>
                <AddVideoToPlaylist currentPlaylist={currentPlaylist}/>
            </Route>
            <Route path="/playlist/new" exact>
                <NewPlaylist />
            </Route>
        </Switch>
    );
}