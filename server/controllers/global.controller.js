import { catchAsync } from "../lib/catchAsync.js";
import Expenses from "../models/expenses.models.js";
import JunkFood from "../models/junkFood.models.js";

export const getTodayActivity = catchAsync(async (req, res) => {
  const { clerkID } = req.query;

  if (!clerkID) {
    return res.status(400).json({ message: "Clerk ID is required" });
  }

  const todayExpenses = await Expenses.find({
    clerkID,
    date: { $gte: new Date().setHours(0, 0, 0, 0) },
  });

  const todayJunkFoods = await JunkFood.find({
    clerkID,
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
  });

  res.status(200).json({ todayExpenses, todayJunkFoods });
});
