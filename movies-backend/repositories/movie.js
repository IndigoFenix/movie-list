'use strict';

const Movie = require('../models/movie');

exports.create = async(data) => {
    const movie = new Movie(data);
    await movie.save();
    return movie;
}

exports.findByTitle = async(title) => {
    const result = await Movie.findOne({'title':title});
    return result;
}

exports.findOne = async(id) => {
    const result = await Movie.findOne({'_id':id});
    return result;
}

exports.findMany = async(query) => {
    const result = await Movie.find(query).sort({'date':-1});
    return result;
}

exports.updateOne = async(id,update) => {
    const result = await Movie.findOneAndUpdate({'_id':id},update);
    return result;
}

exports.deleteOne = async(id) => {
    const result = await Movie.findOneAndDelete({'_id':id});
    return result;
}

exports.deleteMany = async(query) => {
    const result = await Movie.deleteMany(query);
    return result;
}