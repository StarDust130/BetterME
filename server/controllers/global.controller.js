import { catchAsync } from "../lib/catchAsync.js";
import Expenses from "../models/expenses.models.js";
import JunkFood from "../models/junkFood.models.js";

export const getTodayActivity = catchAsync(async (req, res) => {
  const { clerkID } = req.query;

  if (!clerkID) {
    return res.status(400).json({ message: "Clerk ID is required" });
  }

  // Get today's expenses
  const todayExpenses = await Expenses.find({
    clerkID,
    date: { $gte: new Date().setHours(0, 0, 0, 0) },
  });

  // Get today's junk foods
  const todayJunkFoods = await JunkFood.find({
    clerkID,
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
  });

  // Combine both datasets with an additional 'type' field to identify the data
  const combinedData = [
    ...todayExpenses.map((expense) => ({
      ...expense.toObject(),
      type: "expense",
    })),
    ...todayJunkFoods.map((junkFood) => ({
      ...junkFood.toObject(),
      type: "junkFood",
    })),
  ];

  // Sort the combined data by date or createdAt to maintain order (optional)
  combinedData.sort(
    (a, b) => new Date(a.date || a.createdAt) - new Date(b.date || b.createdAt)
  );

  // Send the combined data as a single array
  res.status(200).json({ data: combinedData });
});
