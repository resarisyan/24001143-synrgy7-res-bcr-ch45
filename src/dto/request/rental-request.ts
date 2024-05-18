export interface CreateRentalRequest extends Request {
  car_id: number;
  customer_id: number;
  rentedAt: Date;
  returnedAt: Date;
}
