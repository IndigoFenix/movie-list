'use strict';

const Category = require('../models/category');

exports.create = async(data) => {
    let category = new Category(data);
    await category.save();
    return category;
}

exports.findOne = async(id) => {
    let result = await Category.findOne({'_id':id});
    return result;
}

exports.findMany = async(query) => {
    let result = await Category.find(query);
    return result;
}

exports.updateOne = async(id,update) => {
    let result = await Category.findOneAndUpdate({'_id':id},update);
    return result;
}

exports.deleteOne = async(id) => {
    let result = await Category.findOneAndDelete({'_id':id});
    return result;
}

exports.deleteMany = async(query) => {
    let result = await Category.deleteMany(query);
    return result;
}