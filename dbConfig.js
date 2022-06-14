const dbEngine = process.env.DB_ENVIRONMENT || 'development';
const config = require('./knexfile.js')[dbEngine];

module.exports = require('knex')(config);
