import { Model, ModelObject } from 'objection';

export class CarModel extends Model {
  id!: number;
  plate!: string;
  manufacture!: string;
  model!: string;
  image!: string;
  rentPerDay!: number;
  capacity!: number;
  description!: string;
  transmission!: string;
  year!: number;
  created_at!: Date;
  updated_at!: Date;

  static tableName = 'cars';

  static get relationMappings() {
    return {
      rentals: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/rentals-model',
        join: {
          from: 'cars.id',
          to: 'rentals.car_id',
        },
      },
    };
  }
}

export type Car = ModelObject<CarModel>;
