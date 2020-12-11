const {Schema, model} = require('mongoose');

const schema = new Schema({
    videos: {type: Array},
    description: {type: String, required: true}
});

module.exports = model('Playlist', schema);