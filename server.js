const express = require('express');
const config = require('config');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = config.get('port') || 5000;
const URI = config.get('mongoUri');

app.use(express.json({extended: true}));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/account', require('./routes/account.routes'));
app.use('/api/camera', require('./routes/camera.routes'));
app.use('/api/playlist', require('./routes/playlist.routes'));
app.use('/api/signal', require('./routes/signal.routes'));
app.use('/api/video', require('./routes/video.routes'));

async function start () {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.use(cors());
        app.use(express.json());
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();