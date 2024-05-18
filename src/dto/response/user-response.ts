import { User, UserModel } from '../../models/user-model';

export type UserResponse = {
  username: string;
  name: string;
  token?: string;
};

export function toUserResponse(user: UserModel): UserResponse {
  return {
    username: user.username,
    name: user.name,
  };
}
