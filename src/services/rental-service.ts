import { PageRequest } from '../dto/request/page-request';
import { CreateRentalRequest } from '../dto/request/rental-request';
import {
  RentalResponse,
  toRentalResponse,
} from '../dto/response/rental-response';
import { ResponseError } from '../handlers/response-error';
import { RentalModel } from '../models/rentals-model';
import { Validation } from '../validations';
import { PageValidation } from '../validations/page-validation';
import { Page } from 'objection';
import { RentalValidation } from '../validations/rental-validation';
import { CarModel } from '../models/car-model';
import { PaymentModel } from '../models/payment-model';
import { EnumPaymnentStatus } from '../enums/status-paymnet-enum';

export class RentalService {
  static async getAll(req: PageRequest): Promise<Page<RentalModel>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const cars = await RentalModel.query()
      .page(request.page, request.size)
      .withGraphFetched('car');
    if (cars.results.length === 0) {
      throw new ResponseError(404, 'Cars not found');
    }
    return cars;
  }

  static async getAllByCustomerId(
    req: PageRequest,
    customerId: number
  ): Promise<Page<RentalModel>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const cars = await RentalModel.query()
      .where('customer_id', customerId)
      .withGraphFetched('car')
      .page(request.page, request.size);
    if (cars.results.length === 0) {
      throw new ResponseError(404, 'Cars not found');
    }
    return cars;
  }

  static async getById(id: number): Promise<RentalResponse> {
    const rental = await RentalModel.query()
      .findById(id)
      .withGraphFetched('car');
    if (!rental) {
      throw new ResponseError(404, 'Rental not found');
    }
    return toRentalResponse(rental);
  }

  static async getByIdAndUser(
    id: number,
    customerId: number
  ): Promise<RentalResponse> {
    const rental = await RentalModel.query()
      .findOne({
        id,
        customer_id: customerId,
      })
      .withGraphFetched('car');
    if (!rental) {
      throw new ResponseError(404, 'Rental not found');
    }
    return toRentalResponse(rental);
  }

  static async getByCustomerId(id: number): Promise<RentalResponse[]> {
    const rental = await RentalModel.query()
      .where('customer_id', id)
      .withGraphFetched('car');
    if (!rental) {
      throw new ResponseError(404, 'Rental not found');
    }
    return rental.map(toRentalResponse);
  }

  static async create(req: CreateRentalRequest): Promise<RentalResponse> {
    const trx = await RentalModel.startTransaction();
    try {
      const carRequest = Validation.validate(
        RentalValidation.RENTAL_INSERT,
        req
      );
      const car = await CarModel.query(trx).findOne('id', carRequest.car_id);
      if (!car) {
        throw new ResponseError(404, 'Car not found');
      }

      const rentedAt = new Date(carRequest.rentedAt);
      const returnedAt = new Date(carRequest.returnedAt);
      if (rentedAt > returnedAt) {
        throw new ResponseError(400, 'Rented at must be before returned at');
      }

      const rented = await RentalModel.query(trx)
        .where('car_id', carRequest.car_id)
        .where('returnedAt', null)
        .first();

      if (rented) {
        throw new ResponseError(400, 'Car is already rented');
      }

      const diff = returnedAt.getTime() - rentedAt.getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      const amount = days * car.rentPerDay;
      if (amount < 0) {
        throw new ResponseError(400, 'Invalid amount');
      }

      const insertCar = await RentalModel.query(trx)
        .insert(carRequest)
        .withGraphFetched('car');

      await PaymentModel.query(trx).insert({
        rental_id: insertCar.id,
        amount,
        status: EnumPaymnentStatus.PENDING,
      });

      await trx.commit();
      return toRentalResponse(insertCar);
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
