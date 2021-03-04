const {Router} = require('express');
const router = Router();
const Camera = require('../models/Camera');
const CameraVideo = require('../models/CameraVideo');

// /api/camera
router.get('', async (req, res) => {
    try {
        const {cameraName} = req.query;

        let query = {
            login: {$regex: cameraName, $options: "i"}
        };

        const cameras = await Camera.find(query);

        res.status(200).json(cameras);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

// experimental function for adding videos from camera
router.post('', async (req, res) => {
    try {
        const {cameraId, timeStart, timeEnd} = req.body;

        const date = new Date();
        let newRecord = new CameraVideo({cameraId, date, timeStart, timeEnd});

        if (!newRecord) {
            res.status(400).json({message: 'Не удалось создать видео с камеры'});
        }
        else {
            await newRecord.save();
            res.status(200).json({message: 'Видео с камеры было успешно добавлено'});
        }
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
})

// experimental function for deleting videos from camera
router.delete('', async (req, res) => {
    try {
        const {videoId} = req.body;

        await CameraVideo.findByIdAndDelete(videoId);

        res.status(200).json({message: 'Видео с камеры было успешно удалено'});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
})

router.get('/:cameraId', async (req, res) => {
    try {
        const cameraId = req.params.cameraId;

        const camera = await Camera.findById(cameraId);
        const videos = await CameraVideo.find({cameraId: cameraId}).sort({date: -1}).limit(10);

        res.status(200).json({camera, videos});
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('/:cameraId/query', async (req, res) => {
    try {
        const cameraId = req.params.cameraId;
        const {date, timeStart, timeEnd} = req.query;
        let query = {cameraId: cameraId};

        if (date) {
            query.date = date;
        }

        if (timeStart) {
            query.timeStart = timeStart;
        }

        if (timeEnd) {
            query.timeEnd = timeEnd;
        }
    
        let result = await CameraVideo.find(query).sort({date: -1});

        res.status(200).json(result);
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

router.get('/:cameraId/:videoId', async (req, res) => {
    try {
        const videoId = req.params.videoId;
        const result = await CameraVideo.findById(videoId);

        res.status(200).json(result);
        
    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});

module.exports = router;