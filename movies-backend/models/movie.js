const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    title: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    imdb: { type: String },
    poster: { type: String },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Movie',schema);