import { Model, ModelObject } from 'objection';
import { EnumRoleUser } from '../enums/role-user-enum';
import { CustomerModel } from './customer-model';
import { TokenModel } from './token-model';

export class UserModel extends Model {
  id!: number;
  username!: string;
  password!: string;
  name!: string;
  role!: EnumRoleUser;
  created_at!: Date;
  updated_at!: Date;
  customer!: CustomerModel;

  static tableName = 'users';

  static get relationMappings() {
    return {
      customer: {
        relation: Model.HasOneRelation,
        modelClass: CustomerModel,
        join: {
          from: 'users.id',
          to: 'customers.user_id',
        },
      },

      token: {
        relation: Model.HasOneRelation,
        modelClass: TokenModel,
        join: {
          from: 'users.id',
          to: 'tokens.user_id',
        },
      },
    };
  }
}

export type User = ModelObject<UserModel>;
