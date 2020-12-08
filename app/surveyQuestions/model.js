const mongoose = require('mongoose')
const config = require('../config/model.js');
config.increment.initialize(config.db);

const surveyQuestions = new mongoose.Schema({
	question: {
		question: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		attemptedUsers: {
			type: Number,
			default: 0
		},
		submittedUsers: [{
			userID: {
				type: String,
				default: ""
			}
		}],
		options: [{
			option1: {
				type: String,
				default: ""
			},
			option2: {
				type: String,
				default: ""
			},
			option3: {
				type: String,
				default: ""
			},
			option4: {
				type: String,
				default: ""
			}
		}]
	}
});

module.exports = mongoose.model('surveyQuestions',surveyQuestions)