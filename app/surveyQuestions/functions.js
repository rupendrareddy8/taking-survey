const questionModel = require('./model.js')
function updateQuestion(query, updateData) {
	return new Promise(function(resolve, reject) {
		questionModel.findOneAndUpdate(query, updateData, {new: true}, function(err, response) {
			if(err) return reject("Something went wrong")
			return resolve(response)
		})
	})
}

module.exports = {
	updateQuestion
}