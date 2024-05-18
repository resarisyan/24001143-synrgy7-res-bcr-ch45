import { Model, ModelObject } from 'objection';
import { UserModel } from './user-model';

export class TokenModel extends Model {
  id!: number;
  token!: string;
  user_id!: number;
  is_revoked!: boolean;
  expires_at!: Date;
  created_at!: Date;
  updated_at!: Date;
  user!: UserModel;

  static tableName = 'tokens';

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: 'tokens.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export type Token = ModelObject<TokenModel>;
