import { Knex } from 'knex';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const tableName = 'users';
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableName).del();

  // Inserts seed entries
  await knex(tableName).insert([
    {
      name: 'Admin',
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      role: 'admin',
    },
  ]);

  const users = Array(10)
    .fill(null)
    .map((_, index) => ({
      name: faker.name.fullName(),
      username: faker.internet.userName(),
      password: bcrypt.hashSync('password', 10),
      role: 'customer',
    }));
  await knex(tableName).insert(users);
}
