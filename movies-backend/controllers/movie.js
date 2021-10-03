'use strict';

const movieService = require('../services/movie');

exports.create = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		if (!current_user) return res.status(401).json({'message':'Not logged in'});

		let response = await movieService.create(req.body);
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
		let query = {};
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		}

		if (req.query){
			if (req.query.category) query.category = req.query.category;
		}

		console.log('getting all movies');

		let response = await movieService.query(query);
		console.log(response);
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
		}

		let response = movieService.get(req.params.id);
		
		if (response.success) {
			res.status(200).json(response.result);
		} else {
            res.status(response.error).json({'message':response.message});
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.update = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		} else if (current_user.admin === true) {
			let response = movieService.update(req.params.id,req.body);
			if (response.success) {
				res.status(200).json(response.result);
			} else {
				res.status(response.error).json({'message':response.message});
			}
		} else {
			return res.status(400).json({'message':'Only admins can edit entries!'});
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.delete = async(req, res, next) => {
	try {
		let current_user = req.current_user;
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		} else if (current_user.admin === true) {
			let response = await movieService.delete(req.params.id);
			if (response.success) {
				res.status(200).json(response.result);
			} else {
				res.status(response.error).json({'message':response.message});
			}
		} else {
			return res.status(401).json({'message':'Only admins can delete entries!'});
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}