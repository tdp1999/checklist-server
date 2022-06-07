const mongoose = require('mongoose');

const dataScheme = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		maxlength: 32,
	},
	slug: {
		unique: true,
		type: String,
		required: true,
		trim: true,
		maxlength: 32,
	},
	description: {
		type: String,
		required: true,
	},
	completePercentage: {
		type: Number,
		required: true,
		min: 0,
		max: 100,
		default: 0,
	},
	_createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Category', dataScheme, 'category');
