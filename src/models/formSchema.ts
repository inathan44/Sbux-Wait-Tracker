import { z } from 'zod';

export const trackerSchema = z
  .object({
    food: z.boolean().optional(),
    drinks: z.boolean().optional(),
    mobile: z.boolean().optional(),
    stack: z.boolean().optional(),
    foodItems: z.number().optional(),
    drinkItems: z.number().optional(),
    mobileItems: z.number().optional(),
  })
  .refine(
    (data) =>
      data.food === true || data.drinks === true || data.mobile === true,
    {
      message:
        'At least one of the fields food, drinks, mobile need to be checked',
      path: ['food', 'drinks', 'mobile'], // specify the fields this error is related to
    }
  );
