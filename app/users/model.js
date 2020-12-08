const mongoose = require('mongoose')
const config = require('../config/model.js');
config.increment.initialize(config.db);

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	emailAddress: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	password: {
		type: String,
		default: ""
	}
});

module.exports = mongoose.model('users',userSchema)