'use strict';

const populateService = require('../services/populate');

exports.populate = async(req, res, next) => {
	try {
		let response = await populateService.populate();
		if (response.success) {
			res.status(200).json({'OK':true});
		} else {
            res.status(response.error).json({'message':response.message});
		}
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
};