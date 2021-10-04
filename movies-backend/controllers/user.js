'use strict';

const userService = require('../services/user');

exports.create = async(req, res, next) => {
	try {
		let response = await userService.create(req.body);
		if (response.success) {
			res.status(200).json(response.result);
		} else {
            res.status(response.error).json({'message':response.message});
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.get = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		} else if (current_user.admin === false && current_user._id != req.params.id) {
			return res.status(403).json({'message':'No permission!'});
		}

		let response = await userService.get(req.params.id);
		if (response.success) {
			res.status(200).json(response.result);
		} else {
			res.status(response.error).json({'message':response.message});
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.all = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		} else if (current_user.admin === false && current_user._id != req.params.id) {
			return res.status(403).json({'message':'No permission!'});
		}

		let response = await userService.query({});
		
		if (response.success) {
			res.status(200).json(response.result);
		} else {
			res.status(response.error).json({'message':response.message});
		}
		
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.update = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		if (!current_user){
			return res.status(400).json({'message':'Not logged in!'});
		} else if (current_user.admin === true) {
			let update = {};
			let fields = [];
			for (let i=0;i<fields.length;i++){
				if (req.body[fields[i]] !== undefined){
					update[fields[i]] = req.body[fields[i]];
				}
			}
			let result = await userRepository.updateOne({'_id':req.params.id},update);

			return res.status(200).json(result);
		} else {
			return res.status(400).json({'message':'Only admins can edit users!'});
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.delete = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		let query = {};
		if (!current_user){
			return res.status(400).json({'message':'Not logged in!'});
		} else if (current_user.admin === false) {
			return res.status(400).json({'message':'No permission!'});
		}

		let result = await userRepository.deleteOne({'_id':req.params.id});

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};