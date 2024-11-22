import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import Expenses from "../models/expenses.models.js";

//! Create
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

//! Read
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

//! Update
export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
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
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating expense", error: error.message });
  }
};

// Controller to delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

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
