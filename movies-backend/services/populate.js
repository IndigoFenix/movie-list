'use strict';

const categoryRepository = require('../repositories/category');
const movieRepository = require('../repositories/movie');
const categories = require('../data/categories.json');
const movies = require('../data/movies.json');

exports.populate = async() => {
    await this.delete();
    for (const i=0;i<categories.length;i++){
        const category = await categoryRepository.create(categories[i]);
    }
    for (let i=0;i<movies.length;i++){
        await movieRepository.create(movies[i]);
    }
    return {"success":true};
}

exports.delete = async() => {
    await categoryRepository.deleteMany({});
    await movieRepository.deleteMany({});
}