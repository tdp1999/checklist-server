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
	categoryID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	isDone: {
		type: Boolean,
		required: true,
		default: false,
	},
	_createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Item', dataScheme, 'item');
