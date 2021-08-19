const express = require('express');

const userRouter = require('./user');
const newsRouter = require('./news');

const appRouter = express.Router();


appRouter.use('/user', userRouter);
appRouter.use('/news', newsRouter);
appRouter.use('*', (req, res) => res.status(404).end());


module.exports = appRouter;