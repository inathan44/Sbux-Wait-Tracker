import { z } from "zod";

export const trackerSchema = z
  .object({
    food: z.boolean().optional(),
    drinks: z.boolean().optional(),
    mobile: z.boolean().optional(),
    stack: z.boolean(),
    foodItems: z.number().optional(),
    drinkItems: z.number().optional(),
    mobileItems: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mobile === false && data.drinks === false && data.food === false) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["mobile"],
        message:
          "At least one of the fields food, drinks, mobile need to be checked",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["drinks"],
        message:
          "At least one of the fields food, drinks, mobile need to be checked",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["food"],
        message:
          "At least one of the fields food, drinks, mobile need to be checked",
      });
    }
  })
  .superRefine((data) => {
    if (data.food === false) {
      data.foodItems = 0;
    }
    if (data.drinks === false) {
      data.drinkItems = 0;
    }
    if (data.mobile === false) {
      data.mobileItems = 0;
    }
  });

export type TrackerSchema = z.infer<typeof trackerSchema>;
