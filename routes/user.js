const express = require('express');

const { generateToken, authorize } = require('../middlewares/Authorization');
const userActions = require('../controllers/user');

const router = express.Router();

// Login
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

// Register
router.post('/', async (req, res, next) => {
	const { body } = req;

	try {
		let user = await userActions.addOne(body);
		user = await generateToken(user);
		res.status(201).json(user);
	} catch(err) {
		next(err);
	}
});

router.use(authorize);

// Get user by token
router.get('/', async (req, res, next) => {
	const { userId } = req;

	try {
		const user = await userActions.getOne(userId);
		res.status(200).json(user); 
	} catch (err) {
		next(err);
	}
});

router.patch('/subscribe/:sourceId', async (req, res, next) => {
	const { params: { sourceId }, userId} = req;

	try {
		const result = await userActions.subscribe(userId, sourceId);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

router.patch('/unsubscribe/:sourceId', async (req, res, next) => {
	const { params: { sourceId }, userId} = req;

	try {
		const result = await userActions.unsubscribe(userId, sourceId);
		res.status(200).json(result);
	} catch (err) {
		next(err);
	}
});

module.exports = router;