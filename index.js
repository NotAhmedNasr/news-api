const express = require('express');
const mongoose = require('mongoose');


const app = express();

const mongodb_URL = 'mongodb://localhost:27017/newsapp';

mongoose.connect(mongodb_URL, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true})
	.then(() => {
		console.log('Database server connected successfully!');
	}).catch((err) => {
		console.log(err);
	});


const {PORT = 8000} = process.env;

app.listen(PORT, () => {
	console.log(`App Started and listening on http://localhost:${PORT}`);
});