'use strict';

const movieRepository = require('../repositories/movie');

exports.create = async(body) => {
	if (!body.title) return {'success':false,'error':400,'message':'title is required'};
	if (!body.category) return {'success':false,'error':400,'message':'category is required'};
	if (!body.imdb) return {'success':false,'error':400,'message':'imdb is required'};
	if (!body.poster) return {'success':false,'error':400,'message':'poster is required'};

    const existing = await movieRepository.findByTitle(body.title);
    if (existing){
        return {'success':false,'error':500,'message':'A movie with this title already exists'};
    }

    const movie = await movieRepository.create({
        'title':body.title,
        'category':body.category,
        'imdb':body.imdb,
        'poster':body.poster,
    });
    
    return {'success':true,'result':movie};
};

exports.get = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	try {
		const obj = await movieRepository.findOne(id);
		if (obj) return {'success':true,'result':obj};
		else return {'success':false,'error':404,'message':'Movie '+id+' not found '};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.query = async(query) => {
	if (!query) return {'success':false,'error':400,'message':'query is required'};
	try {
		const obj = await movieRepository.findMany(query);
		if (obj) return {'success':true,'result':obj};
		else return {'success':false,'error':404,'message':'No response'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.update = async(id,body) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	const update = {};
	const allowed_fields = ['title','category','imdb','link'];
	for (let i=0;i<allowed_fields.length;i++){
		if (body[allowed_fields[i]] !== undefined){
			update[allowed_fields[i]] = body[allowed_fields[i]];
		}
	}
	try {
		const updated = await movieRepository.updateOne(id,update);
		if (updated) return {'success':true,'result':1};
		else return {'success':false,'error':404,'message':'Could not update'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};

exports.delete = async(id) => {
	if (!id) return {'success':false,'error':400,'message':'Id is required'};
	
	try {
		const deleted = await movieRepository.deleteOne(id);
		if (deleted) return {'success':true,'result':deleted};
		else return {'success':false,'error':404,'message':'Could not delete'};
	} catch (error) {
		return {'success':false,'error':500,'message':error.message}
	}
};