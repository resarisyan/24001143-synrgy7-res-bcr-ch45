import { PageRequest } from '../../dto/request/page-request';
import { PaymentService } from '../../services/payment-service';
import { Request, Response, NextFunction } from 'express';

export class AdminPaymentController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request: PageRequest = req.body as PageRequest;
      const payments = await PaymentService.getAll(request);
      res.json({
        success: true,
        message: 'Payments found',
        data: payments,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payment = await PaymentService.getById(id);
      res.json({
        success: true,
        message: 'Payment found',
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const payment = await PaymentService.changeStatus(id);
      res.json({
        success: true,
        message: 'Payment status changed',
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  }
}
