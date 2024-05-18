import { Model, ModelObject } from 'objection';
import { CarModel } from './car-model';
import { UserModel } from './user-model';
import { PaymentModel } from './payment-model';
import { CustomerModel } from './customer-model';

export class RentalModel extends Model {
  id!: number;
  car_id!: number;
  customer_id!: number;
  rentedAt!: Date;
  returnedAt!: Date;
  created_at!: Date;
  updated_at!: Date;
  car!: CarModel;
  customer!: CustomerModel;

  static tableName = 'rentals';

  static get relationMappings() {
    return {
      car: {
        relation: Model.BelongsToOneRelation,
        modelClass: CarModel,
        join: {
          from: 'rentals.car_id',
          to: 'cars.id',
        },
      },
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'rentals.customer_id',
          to: 'users.id',
        },
      },
      payments: {
        relation: Model.HasManyRelation,
        modelClass: PaymentModel,
        join: {
          from: 'rentals.id',
          to: 'payments.rental_id',
        },
      },
    };
  }
}

export type Rental = ModelObject<RentalModel>;
