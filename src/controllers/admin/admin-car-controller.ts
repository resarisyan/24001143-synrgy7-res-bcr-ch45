import { encodeToBase64 } from '../../utils/base64';
import { Request, Response, NextFunction } from 'express';
import { CarService } from '../../services/car-service';
import {
  CreateCarRequest,
  UpdateCarRequest,
} from '../../dto/request/car-request';
import { PageRequest } from '../../dto/request/page-request';

export class AdminCarController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const request: PageRequest = req.body as PageRequest;
      const cars = await CarService.getAll(request);
      if (cars.results.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Cars not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Cars found',
        data: cars,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const car = await CarService.getById(id);
      res.json({
        success: true,
        message: 'Car found',
        data: car,
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let request: CreateCarRequest = req.body as CreateCarRequest;
      if (req.file) {
        request.image = await encodeToBase64(req.file! as Express.Multer.File);
      }
      const car = await CarService.create(request);
      res.json({
        success: true,
        message: 'Car created',
        data: car,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: UpdateCarRequest = req.body as UpdateCarRequest;
      if (req.file) {
        request.image = await encodeToBase64(req.file! as Express.Multer.File);
      }
      const car = await CarService.update(id, request);
      res.json({
        success: true,
        message: 'Car updated',
        data: car,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await CarService.delete(id);
      res.json({
        success: true,
        message: 'Car deleted',
      });
    } catch (error) {
      next(error);
    }
  }
}
