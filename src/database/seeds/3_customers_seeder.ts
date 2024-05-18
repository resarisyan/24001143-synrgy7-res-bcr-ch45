import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

const tableName = 'customers';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  const userIds = await knex('users').where('role', 'customer').pluck('id');
  // Inserts seed entries
  userIds.forEach(async (userId) => {
    await knex(tableName).insert({
      user_id: userId,
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.address.streetAddress(),
    });
  });
}
