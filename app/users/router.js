const express = require('express');
const router = express.Router();
const user = require('./model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const settings = require('../config/settings.js')
const verifyToken = require('./verifyToken.js')
const pug = require('pug')


router.post('/register', async function(req, res) {
	try {
		let data = req.body

		let hashedPassword = bcrypt.hashSync(data.password, 8);
		let dataObj = {
			firstName: data.first_name,
			lastName: data.last_name,
			emailAddress: data.email_adress,
			role: data.role,
			password: hashedPassword
		}

		user.create(dataObj, function(err, response) {
			if(err) return res.status(500).send("There was a problem registering the user.")
		    return res.status(201).send("User created successfully")
		})
	} catch(e) {
		return res.status(400).send("something went wrong")
	}
})

router.post('/login', function(req, res, next) {
	user.findOne({emailAddress: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
    let token = jwt.sign({ id: user._id }, settings.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.redirect('/user/dashboard')
  });
})


router.get('/dashboard', function(req,res) {
	res.render("dashboard", {})
})

router.get('/sign-in', async function(req, res) {
	return res.render("signin", {})
})

router.get('/me', verifyToken, function(req, res, next) {

  user.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
  
});

module.exports = router;