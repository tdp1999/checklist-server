// Update with your config settings.
const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL);
config.ssl = { rejectUnauthorized: false };

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	development: {
		client: 'postgresql',
		connection: {
			database: 'checklist',
			user: 'postgres',
			password: '07102464024',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
	production: {
		client: 'pg',
		connection: config,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './migrations',
		},
	},
	// staging: {
	//   client: 'postgresql',
	//   connection: {
	//     database: 'my_db',
	//     user:     'username',
	//     password: 'password'
	//   },
	//   pool: {
	//     min: 2,
	//     max: 10
	//   },
	//   migrations: {
	//     tableName: 'knex_migrations'
	//   }
	// },
	// production: {
	//   client: 'postgresql',
	//   connection: {
	//     database: 'my_db',
	//     user:     'username',
	//     password: 'password'
	//   },
	//   pool: {
	//     min: 2,
	//     max: 10
	//   },
	//   migrations: {
	//     tableName: 'knex_migrations'
	//   }
	// }
};
