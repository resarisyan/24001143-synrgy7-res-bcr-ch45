import { EnumPaymnentStatus } from './../enums/status-paymnet-enum';
import { Model, ModelObject } from 'objection';
import { RentalModel } from './rentals-model';

export class PaymentModel extends Model {
  id!: number;
  rental_id!: number;
  amount!: number;
  status!: EnumPaymnentStatus;
  created_at!: Date;
  updated_at!: Date;
  rental!: RentalModel;

  static tableName = 'payments';

  static get relationMappings() {
    return {
      rental: {
        relation: Model.BelongsToOneRelation,
        modelClass: RentalModel,
        join: {
          from: 'payments.rental_id',
          to: 'rentals.id',
        },
      },
    };
  }
}

export type Payment = ModelObject<PaymentModel>;
