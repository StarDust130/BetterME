import Expenses from "../models/expenses.models.js";

//! Controller to create a new expense
export const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date, clerkID } = req.body;
    const newExpense = new Expenses({
      title,
      amount,
      category,
      date,
      clerkID,
    });

    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense created successfully", newExpense });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating expense 😢", error: error.message });
  }
};

// Controller to get all expenses for a user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find({ clerkID: req.user.id }).sort({
      date: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching expenses", error: error.message });
  }
};

// Controller to update an expense
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
