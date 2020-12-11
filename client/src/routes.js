import React, { useState } from 'react';
import {Switch, Route} from 'react-router-dom';
import { Sidebar } from './common/Sidebar';
import {Profile} from './components/Profile/Profile';
import {Auth} from './components/Auth/Auth';
import { VideoWrapper } from './components/Video/VideoWrapper';
import { CameraWrapper } from './components/Camera/CameraWrapper';
import { PlaylistWrapper } from './components/Playlist/PlaylistWrapper';
import { AccountsWrapper } from './components/Accounts/AccountsWrapper';

export const useRoutes = isAuthenticated => {
    const [currentVideo, setCurrentVideo] = useState(null);

    if (isAuthenticated){
        return (
            <div className="row">
                <Sidebar />

                <div className="col s9 m9 l9 xl9">
                    <Switch>

                        <Route path="/" exact>
                            <Profile/>
                        </Route>


                        <Route path="/camera">
                            <CameraWrapper />
                        </Route>


                        <Route path="/video">
                            <VideoWrapper currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}/>
                        </Route>


                        <Route path="/playlist">
                            <PlaylistWrapper currentVideo={currentVideo} setCurrentVideo={setCurrentVideo}/>
                        </Route>


                        <Route path="/accounts">
                            <AccountsWrapper />
                        </Route>
                        
                    </Switch>
                </div>
            </div>
        )
    }

    return (
        <Switch>
            <Route path="/">
                <Auth />
            </Route>
        </Switch>
    )
}