'use strict';

const User = require('../models/user');

exports.create = async(data) => {
    const user = new User(data);
    user.setPassword(data.pass);
    const error = user.validateSync();
    if (error) {
        return null;
    }
    await user.save();
    return user;
}

exports.findByNameAndPassword = async(name,pass) => {
    const user = await User.findOne({'name':name});
    if (user && user.validatePassword(pass)) return user;
    else return null;
}

exports.findByName = async(name) => {
    const result = await User.findOne({'name':name});
    return result;
}

exports.findOne = async(id) => {
    const result = await User.findOne({'_id':id});
    return result;
}

exports.findMany = async(query) => {
    const result = await User.find(query);
    return result;
}

exports.updateOne = async(id,update) => {
    if (update.pass){
        const dummyUser = new User();
        dummyUser.setPassword(update.pass);
        update.salt = dummyUser.salt;
        update.hash = dummyUser.hash;
        delete update.pass;
    }
    const result = await User.findOneAndUpdate({'_id':id},update);
    return result;
}

exports.deleteOne = async(id) => {
    const result = await User.findOneAndDelete({'_id':id});
    return result;
}

exports.deleteMany = async(query) => {
    const result = await User.deleteMany(query);
    return result;
}