import { Request, Response, NextFunction } from 'express';
import { PageRequest } from '../../dto/request/page-request';
import { RentalService } from '../../services/rental-service';

export class AdminRentalController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PageRequest = req.body as PageRequest;
      const rentals = await RentalService.getAll(request);
      if (rentals.results.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Rentals not found',
        });
      }

      res.json({
        success: true,
        message: 'Rentals found',
        data: rentals,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const rental = await RentalService.getById(id);
      res.json({
        success: true,
        message: 'Rental found',
        data: rental,
      });
    } catch (error) {
      next(error);
    }
  }
}
