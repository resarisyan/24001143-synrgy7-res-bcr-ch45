import { Model, ModelObject } from 'objection';
import { UserModel } from './user-model';

export class CustomerModel extends Model {
  id!: number;
  user_id!: number;
  email!: string;
  phone!: string;
  address!: string;
  created_at!: Date;
  updated_at!: Date;

  static tableName = 'customers';

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'customers.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export type Customer = ModelObject<CustomerModel>;
