const express = require('express');

const appRouter = express.Router();
const userRouter = require('./user');
const newsRouter = require('./news');


appRouter.use('/user', userRouter);
appRouter.use('/news', newsRouter);


module.exports = appRouter;