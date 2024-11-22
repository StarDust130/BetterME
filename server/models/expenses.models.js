import mongoose from "mongoose";

// Define expense categories as an enum
const expenseCategories = [
  "food",
  "transport",
  "entertainment",
  "utilities",
  "other",
];

// Create a schema for expenses
const expensesSchema = new mongoose.Schema(
  {
    userId: {
      // Use 'userId' instead of 'ClerkID'
      type: String,
      required: true,
      index: true, // Add an index for userId for faster querying
    },
    title: {
      type: String,
      required: true,
      trim: true, // Remove extra spaces
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be a positive number"], // Ensure the amount is positive
    },
    category: {
      type: String,
      required: true,
      enum: expenseCategories, // Restrict category to predefined values
    },
    date: {
      type: Date,
      required: true,
      index: true, // Add index for date for better date range queries
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create an index for the userId and date for faster lookups
expensesSchema.index({ userId: 1, date: -1 });

const Expenses = mongoose.model("Expenses", expensesSchema);

export default Expenses;
