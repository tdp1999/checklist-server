// Require variables:
const express = require('express');
const mongoose = require('mongoose');
const categoryRoute = require('./routes/category.route');
const itemRoute = require('./routes/item.route');
require('dotenv').config();

// Constant variables:
const PORT = 8080;

// Variables
const app = express();

// Database connection:
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
	if (err) console.log(err);
	else console.log('Connected to db');
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/category', categoryRoute);
app.use('/api/item', itemRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
