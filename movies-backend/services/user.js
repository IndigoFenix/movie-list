'use strict';

const userRepository = require('../repositories/user');

exports.create = async(body) => {
	if (!body.name) return {'success':false,'error':400,'message':'name is required'};
	if (!body.pass) return {'success':false,'error':400,'message':'pass is required'};
    const existing = await userRepository.findByName(body.name);
    if (existing){
        return {'success':false,'error':500,'message':'A user with this name already exists'};
    }

    const pass = body.pass; 
    const user = await userRepository.create({
        'name':body.name,
        'pass':pass,
        'admin':body.admin || false
    });
    
    return {'success':true,'result':user};
};

exports.get = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		const obj = await userRepository.findOne(id);
		if (obj) return {'success':true,'result':obj};
		else return {'success':false,'error':404,'message':'User '+id+' not found '};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.query = async(query) => {
	if (!query) return {'success':false,'error':400,'message':'query is required'};
	try {
		const obj = await userRepository.findMany(query);
		if (obj) return {'success':true,'result':obj};
		else return {'success':false,'error':404,'message':'No response'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.update = async(id,body) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	const update = {};
	const allowed_fields = [];
	for (let i=0;i<allowed_fields.length;i++){
		if (body[allowed_fields[i]] !== undefined){
			update[allowed_fields[i]] = body[allowed_fields[i]];
		}
	}
	try {
		const updated = await userRepository.updateOne(id,update);
		if (updated) return {'success':true,'result':1};
		else return {'success':false,'error':404,'message':'Could not update'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.delete = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	
	try {
		const deleted = await userRepository.deleteOne(id);
		if (deleted) return {'success':true,'result':deleted};
		else return {'success':false,'error':404,'message':'Could not delete'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};