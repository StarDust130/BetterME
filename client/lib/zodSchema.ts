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

export const junkFoodSchema = z
  .object({
    isEatenToday: z.string().nonempty("Please select Yes or No"),
    title: z.string().optional(),
  })
  .refine(
    (data) => {
      // If 'isEatenToday' is 'yes', 'title' should not be empty
      if (data.isEatenToday === "yes" && !data.title) {
        return false;
      }
      return true;
    },
    {
      message: "Title is required if you ate junk food today",
      path: ["title"], // Apply the error to the 'title' field
    }
  );
