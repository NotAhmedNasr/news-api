const express = require('express');

const { authorize } = require('../middlewares/Authorization');

const newsActions = require('../controllers/news');


const router = express.Router();

router.use(authorize);

router.get('/sources', async (req, res, next) => {
	try {
		const sources = await newsActions.getSources();
		
		res.status(200).json(sources);
	} catch(err) {
		next(err);
	}
});

router.get('/', async (req, res, next) => {
	try {
		const news = await newsActions.getAll(req.userId, 1, 20);
		
		res.status(200).json(news);
	} catch(err) {
		next(err);
	}
});

module.exports = router;