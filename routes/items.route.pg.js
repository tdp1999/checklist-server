const express = require('express');
const router = express.Router();
const queryHelper = require('../helpers/items.query');
const categoryQuery = require('../helpers/categories.query');

// Create a new item
router.post('/', async (req, res) => {
	try {
		const data = await queryHelper.createItem(req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Get all items with / without paginations
// Get an item by slug
// Get an item by categoryID
router.get('/', async (req, res) => {
	try {
		if (req.query.slug) {
			const data = await queryHelper.retrieveItemBySlug(req.query.slug);
			res.status(200).json(data);
			return;
		}

		if (req.query.categoryID) {
			const data = await queryHelper.getItemsByCategoryID(req.query.categoryID);
			res.status(200).json(data);
			return;
		}

		if (req.query.categorySlug) {
			const data = await queryHelper.getItemsByCategorySlug(req.query.categorySlug);
			res.status(200).json(data);
			return;
		}

		if (req.query._page) {
			let _page = req.query._page || 1;
			let _limit = req.query._limit || 10;
			let _sort = req.query._sort || 'createdAt';
			let _order = req.query._order || 'asc';

			const data = await queryHelper.getItemWithPagination(_limit, _page);

			let result = {
				data: data.data,
				paginations: {
					_totalRow: data.pagination.total,
					_page: data.pagination.currentPage,
					_limit: data.pagination.perPage,
				},
			};

			res.status(200).json(result);
		}

		if (Object.keys(req.query).length === 0) {
			const data = await queryHelper.getAllItems();
			res.status(200).json(data);
			return;
		}
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Get an item by id
router.get('/:id', async (req, res) => {
	try {
		const data = await queryHelper.retrieveItemByID(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Update an item by id
router.put('/:id', async (req, res) => {
	try {
		const data = await queryHelper.updateItemByID(req.params.id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Update a field of an item by id
router.patch('/:id', async (req, res) => {
	try {
		const data = await queryHelper.updateItemByID(req.params.id, req.body);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

// Delete an item by id
router.delete('/:id', async (req, res) => {
	try {
		const data = await queryHelper.deleteItemByID(req.params.id);
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

module.exports = router;
