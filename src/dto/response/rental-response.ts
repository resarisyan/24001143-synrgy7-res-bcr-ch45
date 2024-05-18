import { CarModel } from '../../models/car-model';
import { CustomerModel } from '../../models/customer-model';
import { RentalModel } from '../../models/rentals-model';

export type RentalResponse = {
  id: number;
  car: CarModel;
  customer: CustomerModel;
  rentedAt: Date;
  returnedAt: Date;
};

export function toRentalResponse(rental: RentalModel): RentalResponse {
  return {
    id: rental.id,
    car: rental.car,
    customer: rental.customer,
    rentedAt: rental.rentedAt,
    returnedAt: rental.returnedAt,
  };
}
