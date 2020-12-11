const {Router} = require('express');
const router = Router();
const OutputDevice = require('../models/OutputDevice');
const Playlist = require('../models/Playlist');

// /api/signal
router.post('/:outputId/:playlistId', async (req, res) => {
    try {
        const outputId = req.params.outputId;
        const playlistId = req.params.playlistId;

        console.log(outputId);
        console.log(playlistId);

        //const outputDevice = await OutputDevice.findById(outputId);

        //const playlist = await Playlist.findById(playlistId);

        res.status(200).json({message: "Сигнал получен и обработан, функция в стадии разработки"});

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'});
    }
});


module.exports = router;