const express = require('express');
const router = express.Router();
const questionModel = require('./model.js')
const settings = require('../config/settings.js')
const verifyToken = require('../users/verifyToken.js')
const userModel = require('../users/model.js')
const surveyQuestionFunctions = require('../surveyQuestions/functions.js')

router.post('/save-answers', function(req, res) {
	try {

		userModel.findById({_id: req.body.submitted_by}, { password: 0 }, function (err, user) {
		    if (err) return res.status(500).send("There was a problem finding the user.");
		    if (!user) return res.status(404).send("No user found.");
		    if(user.role != "staff") {
		    	return res.status(400).send("You're not authorized to take this survey");
		    }
		  
			let dataObj = {
				answers: req.body.answers,
				submittedBy: req.body.submitted_by
			}

			questionModel.create(dataObj, async function(err, response) {
				if(err) return res.status(500).send("Something went wrong while saving answers")
				response.answers.forEach(async function(answer) {
					try {
					let updateQuery = {
						_id: answer.id
					}

					let updateData = {
						$inc: { "question.attemptedUsers": 1},
						$push: {
							"question.submittedUsers": {
								userID: req.userId
							}
				         }
					}
					let updateQuestion = await surveyQuestionFunctions.updateQuestion(updateQuery, updateData)
				} catch(e) {
					console.log(e)
				}
				})
			return res.status(201).send("question saved successfully")
			})
		});
	} catch(e) {
		return res.status(400).send("Something went wrong.Please try agian after sometine")
	}
})


module.exports = router