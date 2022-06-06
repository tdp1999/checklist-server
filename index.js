// Require variables:
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
require('dotenv').config();

// Constant variables:
const PORT = 8080;

// Variables
const app = express();
const mongoString = process.env.DATABASE_URL;

// Database connection:
mongoose.connect(mongoString, { useNewUrlParser: true });
const database = mongoose.connection;
database.on('error', (error) => {
	console.log(error);
});
database.once('connected', () => {
	console.log('Connected to database');
});

// Middleware
app.use(express.json());

// Routes
app.use('/api', routes);

app.get('/', (req, res) => {
	res.status(200).send('Hello World!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
