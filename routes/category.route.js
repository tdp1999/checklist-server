const express = require('express');
const router = express.Router();
const Model = require('../model/category.model');

const findAndUpdate = async (req, res) => {
	try {
		const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Get all categories with / without paginations
router.get('/', async (req, res) => {
	try {
		if (Object.keys(req.query).length === 0) {
			const data = await Model.find();
			res.status(200).json(data);
			return;
		}

		if (req.query.slug) {
			const data = await Model.find({ slug: req.query.slug });
			res.status(200).json(data);
			return;
		}

		let _page = req.query._page || 1;
		let _limit = req.query._limit || 10;
		let _sort = req.query._sort || 'createdAt';
		let _order = req.query._order || 'asc';
		let _totalRow = await Model.countDocuments();

		const data = await Model.find()
			.skip((_page - 1) * _limit)
			.limit(_limit)
			.sort({ [_sort]: _order });

		let result = {
			data: data,
			paginations: { _totalRow, _page, _limit },
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Get category by id
router.get('/:id', async (req, res) => {
	try {
		const data = await Model.findById(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Create new category
router.post('/', async (req, res) => {
	const data = new Model(req.body);

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update category by id
router.put('/:id', findAndUpdate);

// Patch category by id
router.patch('/:id', findAndUpdate);

// Delete category by id
router.delete('/:id', async (req, res) => {
	try {
		const data = await Model.findByIdAndDelete(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

module.exports = router;
