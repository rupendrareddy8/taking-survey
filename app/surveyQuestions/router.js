const express = require('express');
const router = express.Router();
const questionModel = require('./model.js')
const settings = require('../config/settings.js')

router.post('/save-question', function(req, res) {
	try {
		let dataObj = {
			question: {
				question: req.body.question,
				type: req.body.question_type,
				options: req.body.options
			}
		}

		questionModel.create(dataObj, function(err, response) {
			if(err) return res.status(500).send("Something went wrong while saving question")
			return res.status(201).send("question saved successfully")
		})
	} catch(e) {
		return res.status(400).send("Something went wrong.Please try agian after sometine")
	}
})

module.exports = router;