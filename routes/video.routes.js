const {Router} = require('express');
const router = Router();
const ExternalVideo = require('../models/ExternalVideo');
const Playlist = require('../models/Playlist');

// /api/video
router.post("", async (req, res) => {
    try {
        const {link, description} = req.body;

        const newVideo = new ExternalVideo({link, description});

        await newVideo.save();

        res.status(200).json({message: "Видео добавлено"});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.delete("", async (req, res) => {
    try {
        const {videoId} = req.body;

        await ExternalVideo.findByIdAndDelete(videoId);

        await Playlist.updateMany({}, {$unset: {videos: {_id: videoId}}});


        res.status(200).json({message: "Удаление произведено успешно"});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get("", async (req, res) => {
    try {
        const {videoName} = req.query;

        const query = {
            description: {$regex: videoName, $options: "i"}
        }

        const result = await ExternalVideo.find(query);

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get("/:videoId", async (req, res) => {
    try {
        const videoId = req.params.videoId;

        const result = await ExternalVideo.findById(videoId);

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});


module.exports = router;