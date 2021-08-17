const express = require('express');

const userActions = require('../controllers/user');

const router = express.Router();


router.post('/register', async (req, res, next) => {
	const { body } = req;

	try {
		const user = await userActions.addOne(body);
		res.status(201).json(user);
	} catch(err) {
		next(err);
	}
});

router.post('/login', async (req, res, next) => {
	const { body } = req;
	try {
		const user = await userActions.login(body);
		res.status(200).json(user);
	} catch(err) {
		next(err);
	}
});

module.exports = router;