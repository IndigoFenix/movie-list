'use strict';

const userRepository = require('../repositories/user');

exports.login = async(req, res, next) => {
	try {
        if (!req.body.name || !req.body.pass){
            res.status(400).json({'message':'Username and password are required'});
        }
		const user = await userRepository.findByNameAndPassword(req.body.name,req.body.pass);
        if (user){
            const result = user.toJSON();
            result.token = String(Math.round(Math.random() * 100000));
            result._id = String(result._id);
            req.cache.active_users.set(String(result._id),result);
            res.status(200).json(result);
        } else {
            res.status(401).json({'message':'Username or password is incorrect'});
        }
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};