import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { randomInt } from 'crypto';

const tableName = 'rentals';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  const customerIds = await knex('users').pluck('id');
  const carIds = await knex('cars').pluck('id');
  const rentals = Array(10)
    .fill(null)
    .map((_, index) => ({
      customer_id: customerIds[randomInt(0, customerIds.length - 1)],
      car_id: carIds[randomInt(0, carIds.length - 1)],
      rentedAt: faker.date.recent(),
      returnedAt: faker.date.future(),
    }));

  await knex(tableName).insert(rentals);
}
