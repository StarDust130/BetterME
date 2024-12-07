import { z } from "zod";

export const expensesSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50),

  amount: z
    .number({ message: "Amount is Required 😅" })
    .int()
    .positive()
    .nullable(),
});

export const junkFoodSchema = z.object({
  foodName: z
    .string()
    .min(2, { message: "Food Name must be at least 2 characters." })
    .max(50),
  amount: z
    .number({ message: "Amount is Required 😅" })
    .int()
    .positive()
    .nullable()
    .optional(),
});

export const todoSchema = z.object({
  task: z
    .string()
    .min(2, { message: "Task Name must be at least 2 characters." })
    .max(50),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
});

export const journalSchema = z.object({
  text: z.string().min(2, { message: "Text must be at least 2 characters." }),
});
