const {Router} = require('express');
const router = Router();
const Playlist = require('../models/Playlist');
const ExternalVideo = require('../models/ExternalVideo');

// /api/playlist
router.post('', async (req, res) => {
    try {
        const {description} = req.body;

        const newPlaylist = new Playlist({description: description, videos: []});

        await newPlaylist.save();

        res.status(200).json({message: 'Плейлист создан'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.delete('', async (req, res) => {
    try {
        const {playlistId} = req.body;

        await Playlist.findByIdAndDelete(playlistId);

        res.status(200).json({message: 'Плейлист удален'});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.get('', async (req, res) => {
    try {
        const {playlistName} = req.query;

        let query = {
            description: {$regex: playlistName, $options: "i"}
        };

        const result = await Playlist.find(query);

        res.status(200).json({result});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

// /api/playlist/:playlistId
router.put('/:playlistId', async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const {videoId} = req.body;
        const addingVideo = await ExternalVideo.findById(videoId);

        if (!addingVideo){ 
            return res.status(400).json({message: "Видео не найдено"});
        }

        await Playlist.updateOne({_id: playlistId}, {$push: {videos: addingVideo}});

        res.status(200).json({message: 'Плейлист успешно обновлен'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.get('/:playlistId', async (req, res) => {
    try {
        const {videoName} = req.query;

        let query = {
            description: {$regex: videoName, $options: "i"}
        };

        const playlistId = req.params.playlistId;
        const result = await Playlist.findById(playlistId, {videos: query});

        res.status(200).json({result});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

// /api/playlist/:playlistId/:videoId
router.get('/:playlistId/:videoId', async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const videoId = req.params.videoId;

        const chosenPlaylist = await Playlist.findById(playlistId);
        let result;

        for (i = 0; i < chosenPlaylist.videos.length; i++){
            if (chosenPlaylist.videos[i]._id == videoId){
                result = chosenPlaylist.videos[i];
                break;
            }
        }

        if (!result) {
            res.status(400).json({message: "Видео не найдено"});
        }
        else {
            res.status(200).json(result);
        }

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.delete('/:playlistId/:videoId', async (req, res) => {
    try {
        const playlistId = req.params.playlistId;
        const videoId = req.params.videoId;

        let currentPlaylist = await Playlist.findById(playlistId);

        let currentVideos = [];

        for (let i = 0; i < currentPlaylist.videos.length; i++) {
            if (currentPlaylist.videos[i]._id != videoId) {
                currentVideos.push(currentPlaylist.videos[i]);
            }
        }

        await Playlist.updateOne({_id: playlistId}, {$set: {videos: currentVideos}});
        
        res.status(200).json({message: 'Видео успешно удалено из плейлиста'});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

module.exports = router;