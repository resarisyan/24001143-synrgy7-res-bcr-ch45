import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('cars', (table) => {
    table.increments('id').primary();
    table.string('plate').notNullable();
    table.string('manufacture').notNullable();
    table.string('model').notNullable();
    table.string('image').notNullable();
    table.integer('rentPerDay').notNullable();
    table.integer('capacity').notNullable();
    table.string('description').notNullable();
    table.string('transmission').notNullable();
    table.integer('year').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('cars');
}
