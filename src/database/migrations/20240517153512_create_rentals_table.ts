import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('rentals', (table) => {
    table.increments('id').primary();
    table
      .integer('car_id')
      .notNullable()
      .references('id')
      .inTable('cars')
      .onDelete('CASCADE');
    table
      .integer('customer_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.date('rentedAt').notNullable();
    table.date('returnedAt').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('rentals');
}
