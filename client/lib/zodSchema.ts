import { z } from "zod";

export const expensesSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50),

  amount: z.number({ message: "Amount is Required 😅" }).int().positive(),
});

export const junkFoodSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50),

  isEatenToday: z.enum(["yes", "no"]),
});
