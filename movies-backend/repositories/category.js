'use strict';

const Category = require('../models/category');

exports.create = async(data) => {
    const category = new Category(data);
    await category.save();
    return category;
}

exports.findOne = async(id) => {
    const result = await Category.findOne({'_id':id});
    return result;
}

exports.findMany = async(query) => {
    const result = await Category.find(query);
    return result;
}

exports.updateOne = async(id,update) => {
    const result = await Category.findOneAndUpdate({'_id':id},update);
    return result;
}

exports.deleteOne = async(id) => {
    const result = await Category.findOneAndDelete({'_id':id});
    return result;
}

exports.deleteMany = async(query) => {
    const result = await Category.deleteMany(query);
    return result;
}