import { z } from 'zod';

export const StringNumber = () =>
  z
    .string()
    .refine(
      (value) => {
        return !isNaN(parseFloat(value));
      },
      { message: 'string must be a number' }
    )
    .transform((value) => parseFloat(value));
