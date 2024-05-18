import { Request, Response, NextFunction } from 'express';
import { PageRequest } from '../../dto/request/page-request';
import { RentalService } from '../../services/rental-service';
import { CreateRentalRequest } from '../../dto/request/rental-request';
import { UserRequest } from '../../dto/request/user-request';

export class CustomerRentalController {
  static async getAll(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = req.user?.id as number;
      const rental = await RentalService.getByCustomerId(id);
      res.json({
        success: true,
        message: 'Rental found',
        data: rental,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const userId = req.user?.id as number;
      const rentals = await RentalService.getByIdAndUser(id, userId);
      res.json({
        success: true,
        message: 'Rentals found',
        data: rentals,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body as CreateRentalRequest;
      request.customer_id = (req as UserRequest).user?.id as number;
      const rental = await RentalService.create(request);
      res.json({
        success: true,
        message: 'Rental created',
        data: rental,
      });
    } catch (error) {
      next(error);
    }
  }
}
