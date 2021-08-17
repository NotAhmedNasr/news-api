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


module.exports = router;