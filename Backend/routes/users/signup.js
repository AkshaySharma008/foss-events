const router = require('express').Router();
const mongoose = require('mongoose');
const user = require('../../models//user');
const bcrypt = require('bcrypt');

// post request for signup
//data required in the request body- name, email, password, confirmPassword
router.post('/', async (req, res) => {
	try {
		let { name, email, password, confirmPassword } = req.body;

		//checking if password and confirmPassword are equal
		if (confirmPassword != password) {
			res.send(401).send({
				msg: 'Password and Confirm Password fields should be equal',
			});
		} else {
			let data = await user.findOne({ email });
			
			//checking if the user already exists
			if (data) {
				res.send({
					message: 'User already exists',
				});
			} else {
				// encypting the pasword
				let hashed_password = await bcrypt.hash(password, 10);
				password = hashed_password;
				const User = new user({
					name,
					email,
					password,
				});
				//saving data in database
				let info = await User.save();
				res.send({
					message: 'Data saved',
					data: info,
				});
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).send({
			message: 'Something went wrong',
		});
	}
});

module.exports = router;
