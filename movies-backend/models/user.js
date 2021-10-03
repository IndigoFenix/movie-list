const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto'); 
const ITERATIONS = 1000;

const schema = new Schema({
    name: { type: String, required: true, unique: true, index: true },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
    admin: { type: Boolean, default: false }
});

schema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex'); 
    this.hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, 64, `sha512`).toString(`hex`); 
};

schema.methods.validatePassword = function(password) { 
    var hash = crypto.pbkdf2Sync(password, this.salt, ITERATIONS, 64, `sha512`).toString(`hex`); 
    return this.hash === hash; 
}; 

schema.methods.toJSON = function() {
    //Prevents user passwords from being returned
    var obj = this.toObject();
    delete obj.hash;
    delete obj.salt;
    return obj;
}

module.exports = mongoose.model('User',schema);