// Require variables:
const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
require('dotenv').config();

// const mongoose = require('mongoose');
const categoryRoute = require('./routes/categories.route.pg');
const itemRoute = require('./routes/items.route.pg');

// Constant variables:
const PORT = process.env.PORT || 3000;

// Variables
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(timeout('10s'));

// Routes
app.get('/', (req, res) => {
	res.status(200).redirect('/site-health');
});

app.get('/site-health', (req, res) => {
	res.status(200).json({ status: 'OK' });
});
app.use('/api/category', categoryRoute);
app.use('/api/item', itemRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
