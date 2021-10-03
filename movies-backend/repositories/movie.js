'use strict';

const Movie = require('../models/movie');

exports.create = async(data) => {
    let movie = new Movie(data);
    await movie.save();
    return movie;
}

exports.findByTitle = async(title) => {
    let result = await User.findOne({'title':name});
    return result;
}

exports.findOne = async(id) => {
    let result = await Movie.findOne({'_id':id});
    return result;
}

exports.findMany = async(query) => {
    let result = await Movie.find(query).sort({'date':-1});
    return result;
}

exports.updateOne = async(id,update) => {
    let result = await Movie.findOneAndUpdate({'_id':id},update);
    return result;
}

exports.deleteOne = async(id) => {
    let result = await Movie.findOneAndDelete({'_id':id});
    return result;
}

exports.deleteMany = async(query) => {
    let result = await Movie.deleteMany(query);
    return result;
}