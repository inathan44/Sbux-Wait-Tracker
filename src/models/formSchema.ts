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
  // .refine(
  //   (data) =>
  //     data.mobile === true || data.drinks === true || data.f === true,
  //   {
  //     message:
  //       'At least one of the fields food, drinks, mobile need to be checked',
  //     path: ['food'],
  //   }
  // );
  .superRefine((data, ctx) => {
    if (data.mobile === false && data.drinks === false && data.food === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['mobile'],
        message:
          'At least one of the fields food, drinks, mobile need to be checked',
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['drinks'],
        message:
          'At least one of the fields food, drinks, mobile need to be checked',
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['food'],
        message:
          'At least one of the fields food, drinks, mobile need to be checked',
      });
    }
  });

export type TrackerSchema = z.infer<typeof trackerSchema>;
