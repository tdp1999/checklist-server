const express = require('express');
const router = express.Router();
const Model = require('../model/item.model');

router.get('/', async (req, res) => {
	try {
		const data = await Model.find();
		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

router.post('/', async (req, res) => {
	const data = new Model(req.body);

	try {
		const dataToSave = await data.save();
		console.log(dataToSave);
		res.status(200).json(dataToSave);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

module.exports = router;
