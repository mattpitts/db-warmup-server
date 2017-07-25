const knex = require('./knex');

module.exports = {
	getUserByEmail(email) {
		console.log(email);
		return knex('users').where('email', email).first();
	},
	createUser(user) {
		return knex('users').insert(user, '*');
	}
}
