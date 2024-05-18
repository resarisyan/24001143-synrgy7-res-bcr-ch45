import { z, ZodType } from 'zod';

export class RentalValidation {
  static readonly RENTAL_INSERT: ZodType = z.object({
    car_id: z.number(),
    customer_id: z.number(),
    rentedAt: z.string().refine(
      (value) => {
        return !isNaN(Date.parse(value));
      },
      { message: 'Rented at must be a date' }
    ),
    returnedAt: z.string().refine(
      (value) => {
        return !isNaN(Date.parse(value));
      },
      { message: 'Returned at must be a date' }
    ),
  });
}
