const {Schema, model} = require('mongoose');

const schema = new Schema({
    cameraId: {type: String, required: true},
    date: {type: Date, required: true},
    timeStart: {type: String, required: true},
    timeEnd: {type: String, required: true}
});

module.exports = model('CameraVideo', schema);