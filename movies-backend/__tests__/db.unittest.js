//const conn = require('../db/conn');
const userService = require('../services/user');
const movieService = require('../services/movie');
const categoryService = require('../services/category');
const populateService = require('../services/populate');

const mongoose = require('mongoose');
const   options = {
	socketTimeoutMS: 0,
	keepAlive: true
};


test('Populate the database', async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/movies', options);
    await populateService.populate();
    await mongoose.disconnect();
    expect(true).toBe(true);
    
})