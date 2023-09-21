const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser');

// Importing routes from the routes folder
const userRoutes = require('./routes/userRoutes');


// Creating a Express application 
const app = express();

app.use(cors());

// Setting body parser to get access of request.body
app.use(bodyParser.json());

// Logging all the requests to the console in development environment
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Setting the routes to the app as middlewares
app.use('/api/v1/users', userRoutes);


// Handle unknown routes
app.all('*', (req, res, next) => {
	res.status(404).json({
		status: 'fail',
		message: `Can't find ${req.originalUrl} on this server!`
	})
});

module.exports = app;
