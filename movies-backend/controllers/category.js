'use strict';

const categoryService = require('../services/category');

exports.create = async(req, res, next) => {
	try {
		const current_user = req.current_user;
		if (!current_user) return res.status(401).json({'message':'Not logged in'});

		const response = await categoryService.create(req.body);
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
		const current_user = req.current_user;
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		}

		const response = await categoryService.query({});
		if (response.success) {
			res.status(200).json(response.result);
		} else {
            res.status(response.error).json({'message':response.message});
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};

exports.delete = async(req, res, next) => {
	try {
		const current_user = req.current_user;
		if (!current_user){
			return res.status(401).json({'message':'Not logged in!'});
		} else {
			const response = await categoryService.deleteOne({'_id':req.params.id});
            if (response.success) {
                res.status(200).json(response.result);
            } else {
                res.status(response.error).json({'message':response.message});
            }
		}

	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}