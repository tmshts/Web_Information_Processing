const express = require('express');
const cors = require('cors');
const usersRouter = require('./controllers/users');

// Creates the app
const app = express();

// for request.body in order to be possible to transfer data from front-end into back-end
app.use(express.json())
app.use(cors())

// add middleware
app.use('/api/users', usersRouter);

module.exports = app