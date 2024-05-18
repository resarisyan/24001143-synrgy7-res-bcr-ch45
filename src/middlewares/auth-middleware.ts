import { UserRequest } from '../dto/request/user-request';
import { ResponseError } from '../handlers/response-error';
import { Response, NextFunction } from 'express';
import { TokenModel } from '../models/token-model';

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(
        new ResponseError(401, 'Unauthorized - Missing or invalid token')
      );
    }

    const jwtToken = authHeader.split(' ')[1];
    const dataToken = await TokenModel.query()
      .findOne('token', jwtToken)
      .withGraphFetched('user');
    if (
      !dataToken ||
      dataToken.is_revoked ||
      dataToken.expires_at < new Date()
    ) {
      return next(new ResponseError(401, 'Unauthorized - Invalid token'));
    }

    req.user = dataToken.user;
    req.token = dataToken.token;
    next();
  } catch (err) {
    next(err);
  }
};
