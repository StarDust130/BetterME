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
  // 1) Get all expenses from the database
  const expenses = await Expenses.find({ clerkID: req.body.clerkID }).sort({
    date: -1,
  });

  if (expenses.length === 0) {
    return res.status(404).json({ message: "No expenses found" });
  }

  // 2) Send the response
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
  // 1) Get the clerkID from the request body
  const { clerkID } = req.body;
  if (!clerkID) {
    return res.status(400).json({ message: "clerkID is required" });
  }

  // 2) Get the start and end of the current day
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

  // 3) Query the database
  const todayExpenses = await Expenses.find({
    clerkID: clerkID, 
    date: {
      $gte: startOfDay, 
      $lte: endOfDay, 
    },
  }).sort({ date: -1 }); // Sort by date in descending order

  // 4) Check if there are no expenses
  if (!todayExpenses || todayExpenses.length === 0) {
    return res.status(404).json({ message: "No expenses found for today" });
  }

  // 5) Return the expenses
  res.status(200).json(todayExpenses);
});
