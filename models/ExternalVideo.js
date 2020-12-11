const {Schema, model} = require('mongoose');

const schema = new Schema({
    link: {type: String, required: true},
    description: {type: String, required: true}
});

module.exports = model('ExternalVideo', schema);