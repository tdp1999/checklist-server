const { db } = require('./dbHelpers');

module.exports = {
	getAllItems,
	getItemWithPagination,
	retrieveItemByID,
	retrieveItemBySlug,
	getItemsByCategoryID,
	createItem,
	updateItemByID,
	deleteItemByID,
	getItemsByCategorySlug,
};

function getAllItems() {
	return db('item').orderBy('_createdAt', 'desc');
}

function getItemWithPagination(perPage, currentPage) {
	return db('item')
		.join('category', 'item.categoryID', 'category._id')
		.select('item.*', 'category.name as categoryName')
		.orderBy('_createdAt', 'desc')
		.paginate({ perPage, currentPage, isLengthAware: true });
}

function getItemsByCategoryID(categoryID) {
	return db('item').where('categoryID', categoryID);
}

function getItemsByCategorySlug(slug) {
	return db('item')
		.join('category', 'item.categoryID', 'category._id')
		.where('category.slug', slug)
		.select('item.*')
		.orderBy('_createdAt', 'desc');
}

function retrieveItemByID(id) {
	return db('item').where('_id', id);
}

function retrieveItemBySlug(slug) {
	return db('item').where('slug', slug);
}

async function createItem(item) {
	let createdItem = await db('item').insert(item, '*');
	await calculateCompletePercentageOfACategory(item.categoryID);
	return createdItem;
}

async function updateItemByID(id, item) {
	let updatedItem = await db('item').where('_id', id).update(item, '*');
	let category = await db('item').where('_id', id).select('categoryID');
	await calculateCompletePercentageOfACategory(category[0].categoryID);
	return updatedItem;
}

async function deleteItemByID(id) {
	let category = await db('item').where('_id', id).select('categoryID');
	let deletedItem = await db('item').where('_id', id).del();
	await calculateCompletePercentageOfACategory(category[0].categoryID);
	return deletedItem;
}

// Calculate complete percentage of a category
async function calculateCompletePercentageOfACategory(categoryID) {
	const totalItems = await db('item').where('categoryID', categoryID).count('_id');
	const completeItems = await db('item').where('categoryID', categoryID).where('isDone', true).count('_id');
	let result = Math.round((+completeItems[0].count / +totalItems[0].count) * 100);
	return db('category').where('_id', categoryID).update({ completePercentage: result }, '*');
}
