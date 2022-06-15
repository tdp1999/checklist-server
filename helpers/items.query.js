const { db } = require('./dbHelpers');

module.exports = {
	getAllItem,
	getItemWithPagination,
	retrieveItemByID,
	retrieveItemBySlug,
	retrieveItemByCategory,
	createItem,
	updateItemByID,
	deleteItemByID,
};

function getAllItem() {
	return db('item').orderBy('_createdAt', 'desc');
}

function getItemWithPagination(perPage, currentPage) {
	return db('item').paginate({ perPage, currentPage, isLengthAware: true });
}

function retrieveItemByID(id) {
	return db('item').where('_id', id);
}

function retrieveItemBySlug(slug) {
	return db('item').where('slug', slug);
}

function retrieveItemByCategory(categoryID) {
	return db('item').where('categoryID', categoryID);
}

function createItem(item) {
	return db('item').insert(item, '*');
}

function updateItemByID(id, item) {
	return db('item').where('_id', id).update(item, '*');
}

function deleteItemByID(id) {
	return db('item').where('_id', id).del();
}
