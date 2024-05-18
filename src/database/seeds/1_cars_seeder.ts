import { Knex } from 'knex';
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('cars').del();

  // Inserts seed entries
  const cars = Array(10)
    .fill(null)
    .map((_, index) => ({
      plate: faker.vehicle.vin(),
      manufacture: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      image: faker.image.transport(),
      rentPerDay: faker.random.numeric(5),
      capacity: faker.random.numeric(2),
      description: faker.lorem.sentence(),
      transmission: 'Automatic',
      year: faker.date.anytime().getFullYear(),
    }));

  await knex('cars').insert(cars);
}
