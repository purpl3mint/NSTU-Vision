const {Schema, model} = require('mongoose');

const schema = new Schema({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    streamId: {type: String, unique: true}
});

module.exports = model('Camera', schema);