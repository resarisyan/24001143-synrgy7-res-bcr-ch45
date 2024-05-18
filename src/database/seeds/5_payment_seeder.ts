import { randomInt } from 'crypto';
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const tableName = 'payments';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  const rentalsIds = await knex('rentals').pluck('id');
  const payments = Array(10)
    .fill(null)
    .map((_, index) => ({
      rental_id: rentalsIds[randomInt(0, rentalsIds.length - 1)],
      amount: faker.random.numeric(5),
      status: 'paid',
    }));

  await knex(tableName).insert(payments);
}
