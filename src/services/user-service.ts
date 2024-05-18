import bcrypt from 'bcrypt';
import { Validation } from '../validations';
import { UserValidation } from '../validations/user-validation';
import { LoginUserRequest } from '../dto/request/user-request';
import { UserResponse } from '../dto/response/user-response';
import { UserModel } from '../models/user-model';
import { ResponseError } from '../handlers/response-error';
import { TokenModel } from '../models/token-model';
import jwt from 'jsonwebtoken';

export class UserService {
  public static async login(req: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, req);
    let user = await UserModel.query().findOne(
      'username',
      loginRequest.username
    );
    if (
      !user ||
      !(await bcrypt.compare(loginRequest.password, user.password))
    ) {
      throw new ResponseError(401, 'Invalid username or password');
    }

    const jwtToken = jwt.sign(
      { id: user.id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    const dataToken = await TokenModel.query().insert({
      token: jwtToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 86400000),
      is_revoked: false,
    });

    return {
      username: user.username,
      name: user.name,
      token: dataToken.token,
    };
  }

  public static async logout(token: string): Promise<void> {
    await TokenModel.query().findOne('token', token).patch({
      is_revoked: true,
    });
  }
}
