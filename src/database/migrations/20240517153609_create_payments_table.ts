import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table
      .integer('rental_id')
      .notNullable()
      .references('id')
      .inTable('rentals')
      .onDelete('CASCADE');
    table.integer('amount').notNullable();
    table.enum('status', ['pending', 'paid']).defaultTo('pending');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('payments');
}
