import { StringNumber } from './schema/string-number-validator';
import { z, ZodType } from 'zod';
export class CarValidation {
  static CAR_INSERT: ZodType = z.object({
    plate: z.string().min(1).max(255),
    manufacture: z.string().min(1).max(255),
    model: z.string().min(1).max(255),
    image: z.string(),
    rentPerDay: z.object({
      value: StringNumber(),
      currency: z.string().min(1).max(255),
    }),
    capacity: z.string().refine(
      (value) => {
        return !isNaN(parseInt(value));
      },
      { message: 'Capacity must be a number' }
    ),
    description: z.string().min(1).max(255),
    transmission: z.string().min(1).max(255),
    year: z.string().refine(
      (value) => {
        return !isNaN(parseInt(value));
      },
      { message: 'Year must be a number' }
    ),
  });

  static readonly CAR_UPDATE: ZodType = z.object({
    plate: z.string().min(1).max(255).optional(),
    manufacture: z.string().min(1).max(255).optional(),
    model: z.string().min(1).max(255).optional(),
    image: z.string().optional(),
    rentPerDay: z
      .string()
      .refine(
        (value) => {
          return !isNaN(parseFloat(value));
        },
        { message: 'Rent per day must be a number' }
      )
      .optional(),
    capacity: z
      .string()
      .refine(
        (value) => {
          return !isNaN(parseInt(value));
        },
        { message: 'Capacity must be a number' }
      )
      .optional(),
    description: z.string().min(1).max(255).optional(),
    transmission: z.string().min(1).max(255).optional(),
    year: z.string().refine(
      (value) => {
        return !isNaN(parseInt(value));
      },
      { message: 'Year must be a number' }
    ),
  });
}
