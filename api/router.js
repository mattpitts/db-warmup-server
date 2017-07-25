const express = require('express');
const bcrypt = require('bcrypt');
const valid = require('./valid')
const router = express.Router();

const queries = require('../db/queries');




router.post('/auth/signup', (req,res,next) => {
	if(valid.user(req.body)) {
		queries.getUserByEmail(req.body.email).then(user => {
			if(!user) {
				bcrypt.hash(req.body.password, 8).then(hash => {
					let newUser = {
						email: req.body.email,
						password: hash
					}
					queries.createUser(newUser).then(user => {
						res.json({
							user
						})
					})
				})
			} else {
				next(new Error('Email in use'));
			}
		})
	}
});


router.post('/auth/login', (req,res,next) => {
	if(valid.user(req.body)) {
		queries.getUserByEmail(req.body.email).then(user => {
			console.log(user);
			if(!user) {
				next(new Error('User not found'))
			} else {
				bcrypt.compare(req.body.password, user.password).then(response => {
					if(response) {
						res.json({
							user
						});
					} else {
						next(new Error('Invalid password'));
					}
				})
			}
		})
	} else {
		next(new Error('Invalid login'));
	}
})

module.exports = router;
