const express = require('express');

const appRouter = express.Router();
const userRouter = require('./user');


appRouter.use('/user', userRouter);


module.exports = appRouter;