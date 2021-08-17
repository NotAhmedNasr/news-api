const express = require('express');

const { generateToken } = require('../middlewares/Authorization');
const userActions = require('../controllers/user');

const router = express.Router();


router.post('/register', async (req, res, next) => {
	const { body } = req;

	try {
		let user = await userActions.addOne(body);
		user = await generateToken(user);
		res.status(201).json(user);
	} catch(err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	const { body } = req;
	try {
		let user = await userActions.login(body);
		user = await generateToken(user);
		res.status(200).json(user);
	} catch(err) {
		next(err);
	}
});

module.exports = router;