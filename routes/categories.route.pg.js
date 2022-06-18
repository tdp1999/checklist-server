const express = require('express');
const router = express.Router();
const dbHelpers = require('../helpers/categories.query');

// Create a new category
router.post('/', async (req, res) => {
	try {
		const data = await dbHelpers.createCategory(req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Get all categories with / without paginations
// Get a category by slug
router.get('/', async (req, res) => {
	try {
		if (Object.keys(req.query).length === 0) {
			const data = await dbHelpers.getAllCategories();
			res.status(200).json(data);
			return;
		}

		if (req.query.slug) {
			const data = await dbHelpers.retrieveCategoryBySlug(req.query.slug);
			res.status(200).json(data);
			return;
		}

		let _page = req.query._page || 1;
		let _limit = req.query._limit || 10;
		let _sort = req.query._sort || 'createdAt';
		let _order = req.query._order || 'asc';
		// let _totalRow = await dbHelpers.getAllCategories().count();

		const data = await dbHelpers.getCategoryWithPagination(_limit, _page);

		let result = {
			data: data.data,
			paginations: {
				_totalRow: data.pagination.total,
				_page: data.pagination.currentPage,
				_limit: data.pagination.perPage,
			},
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Get a category by id
router.get('/:id', async (req, res) => {
	try {
		const data = await dbHelpers.retrieveCategoryByID(req.params.id);
		res.status(200).json(data[0]);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Update a category by id
router.put('/:id', async (req, res) => {
	try {
		const data = await dbHelpers.updateCategory(req.params.id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Update a field of a category by id
router.patch('/:id', async (req, res) => {
	try {
		const data = await dbHelpers.updateCategory(req.params.id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Delete a category by id
router.delete('/:id', async (req, res) => {
	try {
		const data = await dbHelpers.deleteCategory(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Get calculate category percentage of a category
// router.get('/:categoryID/calculate', async (req, res) => {
// 	try {
// 		const data = await dbHelpers.calculateCompletePercentageOfACategory(req.params.categoryID);
// 		res.status(200).json(data);
// 	} catch (error) {
// 		res.status(404).json({ message: error.message });
// 	}
// });

module.exports = router;
