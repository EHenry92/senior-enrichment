'use strict'
const api = require('express').Router();
const db= require('../db');
const Student = require('../db/models/Student');
const Campus = require('../db/models/Campus');


// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!
api.get('/hello', (req, res) => res.send({hello: 'world'}))

//campuses
api.get('/campuses', (req, res, next) => {
	Campus.findAll()
	.then(info => {
		res.json(info);
	})
	.catch(next);
})
.get('/campuses/:campusId', (req, res, next) => {
	Campus.findById(req.params.campusId)
	.then(info => {
		if (!info)	{
			res.status(404).end('That is not a valid Campus Id');
		}
		else {		res.json(info);
		}
	})
	.catch(err => res.send('Invald Campus', err))
})
.post('/campuses', (req, res, next) => {
	const aName = req.body.name;
	const aImage = req.body.image;
	Campus.create({
		name: aName,
		image: aImage
	})
	.then(campus => {
		res.json(campus);
	})
})
.put('/campuses/:campusId', (req, res, next) =>	{
	if (req.body.image) {
		const aImage = req.body.image;
		Campus.update(
			{
				image: aImage
			}, {
				 where: { id: req.params.campusId },
				 returning: true,
				 plain: true
			}
		)
		.then(results => res.json(results))
		.catch(err => next(err))
	}
})
.delete('/campuses/:campusId', (req, res, next) => {
	Campus.destroy({
		where: {id: req.params.campusId}
	})
	.then(trash => res.json(trash))
	.catch(err => next(err))
})


//Students
api.get('/students', (req, res, next) => {
	Student.findAll({include:[{model: Campus}]})
	.then(info => {
		res.json(info);
	})
})
.get('/students/:studentId', (req, res, next) => {
	Student.findById(req.params.studentId, {include: [{model: Campus}]})
	.then(info => {
		if (!info)	{
			res.status(404).end('That is not a valid student id');
		}
		else {res.json(info);
		}
	})
	.catch(err => res.send('Invalid Student', err))
})
.post('/students', (req, res, next) => {
	const aName = req.body.name;
	const aemail = req.body.email;
	const aId = req.body.campusId;
	Student.create({
		name: aName,
		email: aemail,
		campusId: aId
	})
	.then(info =>	{
		res.json(info)
	})
})
.put('/students/:studentId', (req, res, next) =>	{
		console.log(req.body.student)
		Student.update(
			req.body, {
				 where: { id: req.params.studentId },
				 returning: true,
				 plain: true
			}
		)
		.then(results => {res.json(results)})
		.catch(next)
})
.delete('/students/:studentId', (req, res, next) => {
	Student.destroy({
		where: {id: req.params.studentId}
	})
	.then(trash => res.json(trash))
	.catch(err => next(err))
})

module.exports = api
