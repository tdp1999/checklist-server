// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development);
const db = require('../dbconfig');
const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = {
	getAllCategories,
	getCategoryByID,
	getCategoryBySlug,
	createCategory,
	getCategoryWithPagination,
};

// Get Category
function getAllCategories() {
	return db('category');
}

function getCategoryByID(id) {
	return db('category').where('_id', id);
}

function getCategoryBySlug(slug) {
	return db('category').where('slug', slug);
}

function getCategoryWithPagination(perPage, currentPage) {
	return db('category').paginate({ perPage, currentPage, isLengthAware: true });
}

// add new category and return the new category
function createCategory(category) {
	return db('category').insert(category, '*');
}
