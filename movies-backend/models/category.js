const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String, required: true, unique: true, index: true }
});

module.exports = mongoose.model('Category',schema);