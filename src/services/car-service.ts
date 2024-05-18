import cloudinary from '../config/cloudinary';
import { CreateCarRequest, UpdateCarRequest } from '../dto/request/car-request';
import { PageRequest } from '../dto/request/page-request';
import { CarResponse, toCarResponse } from '../dto/response/car-response';
import { ResponseError } from '../handlers/response-error';
import { Validation } from '../validations';
import { CarValidation } from '../validations/car-validation';
import { PageValidation } from '../validations/page-validation';
import { CarModel } from '../models/car-model';
import { Page } from 'objection';

export class CarService {
  static async getAll(req: PageRequest): Promise<Page<CarModel>> {
    const request = Validation.validate(PageValidation.PAGE, req);
    const cars = await CarModel.query().page(request.page, request.size);
    if (cars.results.length === 0) {
      throw new ResponseError(404, 'Cars not found');
    }
    return cars;
  }

  static async getById(id: number): Promise<CarResponse> {
    const car = await CarModel.query().findById(id);
    if (!car) {
      throw new ResponseError(404, 'Car not found');
    }
    return toCarResponse(car);
  }

  static async create(req: CreateCarRequest): Promise<CarResponse> {
    const carRequest = Validation.validate(CarValidation.CAR_INSERT, req);
    await cloudinary.uploader.upload(
      carRequest.image,
      async (error, result) => {
        if (error) {
          throw new ResponseError(400, 'Image upload failed');
        }
        carRequest.image = result!.secure_url;
      }
    );
    const insertCar = await CarModel.query().insert(carRequest);
    return toCarResponse(insertCar);
  }

  static async update(id: number, req: UpdateCarRequest) : Promise<CarResponse> {
    const car = await CarModel.query().findById(id);
    if (!car) {
      throw new ResponseError(404, 'Car not found');
    }
    const carRequest = Validation.validate(CarValidation.CAR_UPDATE, req);

    if (carRequest.image) {
      const image = car.image?.split('/').pop()?.split('.')[0];
      if (image) cloudinary.uploader.destroy(image);
      await cloudinary.uploader.upload(
        carRequest.image,
        async (error, result) => {
          if (error) {
            throw new ResponseError(400, 'Image upload failed');
          }

          carRequest.image = result!.secure_url;
        }
      );
    }

    const updatedCar = await CarModel.query().patchAndFetchById(id, carRequest);
    return toCarResponse(updatedCar);
  }

  static async delete(id: number): Promise<void> {
    const car = await CarModel.query().findById(id);
    if (!car) {
      throw new ResponseError(404, 'Car not found');
    }
    const image = car.image?.split('/').pop()?.split('.')[0];
    CarModel.query().deleteById(id);
    if (image) cloudinary.uploader.destroy(image);
  }
}
