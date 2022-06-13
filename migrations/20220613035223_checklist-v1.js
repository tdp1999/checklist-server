/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
	await knex.raw('create extension if not exists "uuid-ossp"');
	return knex.schema
		.createTable('category', (table) => {
			table.uuid('_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').notNullable();
			table.string('slug').notNullable().unique().index();
			table.text('description').notNullable();
			table.integer('completePercentage').defaultTo(0);
			table.timestamp('_createdAt').defaultTo(knex.fn.now());
		})
		.createTable('item', (table) => {
			table.uuid('_id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
			table.string('name').notNullable().unique().index();
			table.string('slug').notNullable();
			table.text('content').notNullable();
			table.boolean('isDone').notNullable();
			table.uuid('categoryID').references('_id').inTable('category').onDelete('CASCADE').onUpdate('CASCADE');
			table.timestamp('_createdAt').defaultTo(knex.fn.now());
			table.timestamp('_updatedAt').defaultTo(knex.fn.now());
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	knex.raw('drop extension if exists "uuid-ossp"');
	return knex.schema.dropTableIfExists('item').dropTableIfExists('category');
};
