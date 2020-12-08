const mongoose = require('mongoose')
const config = require('../config/model.js');
config.increment.initialize(config.db);

const answers = new mongoose.Schema({
	answers: [
		{
			id: {
				type: String,
				required: true
			},
			answer: {
				type: String,
				required: true
			}
		}
	],
	submittedBy: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('answers',answers)