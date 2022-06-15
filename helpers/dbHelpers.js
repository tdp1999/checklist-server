const db = require('../dbConfig');
const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = { db };
