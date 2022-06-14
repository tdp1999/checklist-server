// Require variables:
const express = require('express');
const cors = require('cors');
const timeout = require('connect-timeout');
require('dotenv').config();

// const mongoose = require('mongoose');
const categoryRoute = require('./routes/categories.route.pg');
// const itemRoute = require('./routes/item.route');

// Constant variables:
const PORT = process.env.PORT || 3000;

// Variables
const app = express();

// Database connection:
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
// 	if (err) console.log(err);
// 	else console.log('Connected to db');
// });

// Middleware
app.use(express.json());
app.use(cors());
app.use(timeout('10s'));

// Routes
app.use('/site-health', (req, res) => {
	res.status(200).json({ status: 'OK' });
});
app.use('/api/category', categoryRoute);
// app.use('/api/item', itemRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
