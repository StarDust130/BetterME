import mongoose from "mongoose";

// Define expense categories as an enum
const expenseCategories = [
  "food",
  "self-improvement",
  "entertainment",
  "girlfriend",
  "essential",
  "other",
];
// Create a schema for expenses
const expensesSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      enum: expenseCategories,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create an index for the userId and date for faster lookups
expensesSchema.index({ userId: 1, date: -1 });

const Expenses = mongoose.model("Expenses", expensesSchema);

export default Expenses;
