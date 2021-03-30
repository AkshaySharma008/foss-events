const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const user = require('../../models/user');
const bcrypt = require('bcrypt');

//Post request for login
//data required in request body - email, password
router.post('/', async (req, res) => {
	try {
		const { email, password } = req.body;
		let data = await user.findOne({ email });
		console.log(data);

		//checking if the user exists in database or not
		if (data) {
			let exist = await bcrypt.compare(password, data.password);

			//checking if the password is correct or not
			if (exist === true) {
				let token = await jwt.sign({ email: data.email }, '123', {expiresIn:"15m"});
				res.send({
					message: 'login successful',
					token: token,
				});
			} else {
				res.status(401).send({
					message: 'Invalid Credentials',
				});
			}
		} else {
			res.status(401).send({
				message: 'Invalid Credentials',
			});
		}
	} catch (err) {
		res.status(500).send({
			message: 'Something went wrong',
		});
	}
});

module.exports = router;
