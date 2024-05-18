import { NextFunction, Response } from 'express';
import { EnumRoleUser } from '../enums/role-user-enum';
import { ResponseError } from '../handlers/response-error';
import { UserRequest } from '../dto/request/user-request';

export class CheckRole {
  public static isAdmin(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): void {
    if (req.user!.role !== EnumRoleUser.ADMIN) {
      return next(new ResponseError(403, 'Forbidden - Not an admin'));
    }
    next();
  }

  public static isCustomer(
    req: UserRequest,
    res: Response,
    next: NextFunction
  ): void {
    if (req.user!.role !== EnumRoleUser.CUSTOMER) {
      return next(new ResponseError(403, 'Forbidden - Not a customer'));
    }
    next();
  }
}
