import mongoose from "mongoose";

// Schema definition
const dayTaskSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: [true, "Clerk ID is required"],
      index: true,
    },
    expenses: [
      {
        title: { type: String, required: true },
        amount: { type: Number, min: 0, required: true },
      },
    ],
    junkFood: [
      {
        foodName: { type: String, required: true },
        amount: { type: Number, min: 0, required: true },
      },
    ],
    journal: {
      text: { type: String },
    },
    todo: [
      {
        task: { type: String, required: true },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        description: {
          type: String,
        },
        priority: {
          type: String,
          enum: ["high", "medium", "low"],
          default: "low",
        },
      },
    ],
    insights: {
      totalExpenses: { type: Number, default: 0 },
      junkFoodCount: { type: Number, default: 0 },
      topExpenseCategory: { type: String, default: "" },
      aiTips: { type: String },
    },
    date: {
      type: Date,
      required: true, // Ensure date is provided
      index: true, // Make sure it's indexed
    },
  },
  { timestamps: true }
);

const DayTask = mongoose.model("DayTask", dayTaskSchema);

export default DayTask;
