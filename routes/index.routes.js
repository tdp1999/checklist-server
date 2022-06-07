// Require variables:
// const app = require('express')();
// const categoryRoute = require('./routes/category.route');

// app.use('/category', categoryRoute);

// // Post Method:
// router.post('/', async (req, res) => {
// 	const data = new Model(req.body);

// 	try {
// 		const dataToSave = await data.save();
// 		console.log(dataToSave);
// 		res.status(200).json(dataToSave);
// 	} catch (error) {
// 		res.status(400).json({ message: error.message });
// 	}
// });

// // Get All Method:
// router.get('/', async (req, res) => {
// 	try {
// 		const data = await Model.find();
// 		res.status(200).json(data);
// 	} catch (error) {
// 		res.status(404).json({ message: error.message });
// 	}
// });

// // Get by ID Method:
// router.get('/:id', async (req, res) => {
// 	try {
// 		const data = await Model.findById(req.params.id);
// 		res.status(200).json(data);
// 	} catch (error) {
// 		res.status(404).json({ message: error.message });
// 	}
// });

// // Update by ID Method:
// router.put('/:id', (req, res) => {
// 	res.status(200).send('Update by ID API!');
// });

// // Delete by ID Method:
// router.delete('/:id', (req, res) => {
// 	res.status(200).send('Delete by ID API!');
// });

// module.exports = router;
