'use strict';

const User = require('../models/user');

exports.create = async(data) => {
    console.log('Creating user');
    let user = new User(data);
    console.log(user);
    user.setPassword(data.pass);
    let error = user.validateSync();
    if (error) {
        return null;
    }
    await user.save();
    return user;
}

exports.findByNameAndPassword = async(name,pass) => {
    let user = await User.findOne({'name':name});
    if (user && user.validatePassword(pass)) return user;
    else return null;
}

exports.findByName = async(name) => {
    let result = await User.findOne({'name':name});
    return result;
}

exports.findOne = async(id) => {
    let result = await User.findOne({'_id':id});
    return result;
}

exports.findMany = async(query) => {
    let result = await User.find(query);
    return result;
}

exports.updateOne = async(id,update) => {
    if (update.pass){
        let dummyUser = new User();
        dummyUser.setPassword(update.pass);
        update.salt = dummyUser.salt;
        update.hash = dummyUser.hash;
        delete update.pass;
    }
    let result = await User.findOneAndUpdate({'_id':id},update);
    return result;
}

exports.deleteOne = async(id) => {
    let result = await User.findOneAndDelete({'_id':id});
    return result;
}

exports.deleteMany = async(query) => {
    let result = await User.deleteMany(query);
    return result;
}