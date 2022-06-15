const dbEngine = process.env.DB_ENVIRONMENT || 'development';
console.log('dbEngine: ', dbEngine);
const config = require('./knexfile.js')[dbEngine];
module.exports = require('knex')(config);
