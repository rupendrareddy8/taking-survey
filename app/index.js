const express = require('express');


const user = require('./users/router.js')
const question = require('./surveyQuestions/router.js')
const answers = require('./answers/router.js')


const router = express.Router();

router.use('/user', user);
router.use('/questions', question);
router.use('/answers', answers);



module.exports = router