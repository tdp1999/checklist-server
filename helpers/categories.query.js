const { db } = require('./dbHelpers');

module.exports = {
	createCategory,
	getAllCategories,
	retrieveCategoryBySlug,
	getCategoryWithPagination,
	retrieveCategoryByID,
	updateCategory,
	deleteCategory,
};

function getAllCategories() {
	return db('category').orderBy('_createdAt', 'desc');
}

function retrieveCategoryByID(id) {
	return db('category').where('_id', id);
}

function retrieveCategoryBySlug(slug) {
	return db('category').where('slug', slug);
}

function getCategoryWithPagination(perPage, currentPage) {
	return db('category').paginate({ perPage, currentPage, isLengthAware: true });
}

function createCategory(category) {
	return db('category').insert(category, '*');
}

function updateCategory(id, category) {
	return db('category').where('_id', id).update(category, '*');
}

function deleteCategory(id) {
	return db('category').where('_id', id).del();
}
