'use strict';

const categoryRepository = require('../repositories/category');

exports.create = async(body) => {
	if (!body.name) return {'success':false,'error':400,'message':'name is required'};

    const existing = await categoryRepository.findOne({'name':body.name});
    if (existing){
        return {'success':false,'error':500,'message':'A category with this name already exists'};
    }

    const category = await categoryRepository.create({
        'name':body.name
    });
    
    return {'success':true,'result':body.name};
};

exports.query = async(query) => {
	if (!query) return {'success':false,'error':400,'message':'query is required'};
	try {
		const obj = await categoryRepository.findMany(query);
		if (obj) {
            const arr = [];
            for (let i=0;i<obj.length;i++) arr.push(obj[i].name);
            return {'success':true,'result':arr};
        }
		else return {'success':false,'error':404,'message':'No result'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.delete = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		const deleted = await categoryRepository.deleteOne(id);
		if (deleted) return {'success':true,'result':deleted.name};
		else return {'success':false,'error':404,'message':'Could not delete'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};