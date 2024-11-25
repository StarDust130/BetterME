import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import Expenses from "../models/expenses.models.js";

//! Create ✏️
export const createExpense = catchAsync(async (req, res, next) => {
  // 1) Get the data from the request body
  const { title, amount, category, date, clerkID } = req.body;

  if (!clerkID) {
    return next(new AppError("clerkID is Required", 404));
  }

  // 2) Create a new expense
  const newExpense = new Expenses({
    title,
    amount,
    category,
    date,
    clerkID,
  });

  // 3) Save the new expense to the database
  await newExpense.save();

  // 4) Send the response
  res.status(201).json({ message: "Expense created successfully", newExpense });
});

//! Read All 📚
export const getExpenses = catchAsync(async (req, res) => {
  // Access clerkID from query parameters
  const { clerkID } = req.query;

  if (!clerkID) {
    return res.status(400).json({ message: "Clerk ID is required" });
  }

  // Fetch expenses for the provided clerkID
  const expenses = await Expenses.find({ clerkID }).sort({ date: -1 });

  if (expenses.length === 0) {
    return res.status(404).json({ message: "No expenses found" });
  }

  // Send the response
  res.status(200).json(expenses);
});

//! Update 🔄
export const updateExpense = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return new next(AppError("Please provide an id", 404));
  }
  const { title, amount, category, date } = req.body;

  const updatedExpense = await Expenses.findByIdAndUpdate(
    id,
    { title, amount, category, date },
    { new: true }
  );

  if (!updatedExpense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  res
    .status(200)
    .json({ message: "Expense updated successfully", updatedExpense });
});

//! Delete  🗑️
export const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return new next(AppError("Please provide an id", 404));
    }

    const deletedExpense = await Expenses.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting expense", error: error.message });
  }
};

//! Get Today's Expenses 📅
export const getToday = catchAsync(async (req, res) => {
  const { clerkID } = req.query;

  // Validate clerkID
  if (!clerkID) {
    return res.status(400).json({ message: "clerkID is required" });
  }

  // Calculate start and end of the current day in UTC
  const now = new Date();
  const startOfDay = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  const endOfDay = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

  // Query today's expenses
  const todayExpenses = await Expenses.find({
    clerkID,
    date: { $gte: startOfDay, $lte: endOfDay },
  }).sort({ date: -1 });

  // Return the results or a 404 if no expenses are found
 if (todayExpenses.length === 0) {
   return res
     .status(200)
     .json({ message: "No expenses found for today", data: [] });
 }
 res.status(200).json({ data: todayExpenses });
});

