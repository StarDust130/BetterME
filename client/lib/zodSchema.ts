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

  category: z
    .enum([
      "food",
      "self-improvement",
      "entertainment",
      "girlfriend",
      "essential",
      "other",
    ])
    .optional(),
});

export const junkFoodSchema = z
  .object({
    isEatenToday: z.string().nonempty("Please select Yes or No"),
    foodName: z.string().optional(),
  })
  .refine(
    (data) => {
      // If 'isEatenToday' is 'yes', 'foodName' should not be empty
      if (data.isEatenToday === "yes" && !data.foodName) {
        return false;
      }
      return true;
    },
    {
      message: "foodName is required if you ate junk food today",
      path: ["foodName"], // Apply the error to the 'foodName' field
    }
  );
