const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const appRouter = require('./routes');
const errorHandler = require('./middlewares/Error');


const app = express();

// Essential middlewares
app.use(cors());
app.use(express.json());


const {MONGODB_URI, PORT=8000} = process.env;

mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true})
	.then(() => {
		console.log('Database server connected successfully!');
	}).catch((err) => {
		console.log(err);
	});

// Handling end points
app.use('/api', appRouter);

// Handling errors
app.use(errorHandler);


app.listen(PORT, () => {
	console.log(`App Started and listening on http://localhost:${PORT}`);
});