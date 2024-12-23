import { z } from "zod";

export const expensesSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Too short! She says, 'Size does matter! 😉'" })
    .max(25, { message: "Too long! 🥲 'That's what she said 😜'" }),

  amount: z
    .number({ message: "Amount is Required 😅" })
    .int()
    .positive()
    .nullable(),
});

export const junkFoodSchema = z.object({
  foodName: z
    .string()
    .min(2, { message: "Too short! She says, 'Size does matter! 😉'" })
    .max(20, { message: "Too long! 🥲 'That's what she said 😜'" }),
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
    .min(2, { message: "Too short! She says, 'Size does matter! 😉'" })
    .max(20, { message: "Too long! 🥲 'That's what she said 😜'" }),
  priority: z.enum(["low", "medium", "high"]).optional(),
});


export const habitSchema = z.object({
  habitName: z
    .string()
    .min(2, { message: "Too short! She says, 'Size does matter! 😉'" })
    .max(18, { message: "Too long! 🥲 'That's what she said 😜'" }),

  frequency: z.enum([
    "daily",
    "weekdays",
    "mon-wed-fri",
    "tue-thu-sat",
    "mon-sat",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
    "custom", // Added "custom" frequency
  ]),

  customDays: z
    .array(
      z.enum(["sun", "mon", "tue", "wed", "thu", "fri", "sat"]) // Days of the week
    )
    .optional()
    .refine(
      (days) => days?.length !== 0 || days === undefined,
      "You must select at least one day for custom frequency."
    )
    .nullable(),
});


export const journalSchema = z.object({
  text: z.string().min(2, { message: "Text must be at least 2 characters." }),
});
