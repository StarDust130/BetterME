import mongoose from "mongoose";

// Schema definition
const dayTaskSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: [true, "Clerk ID is required"],
      index: true,
      select: false,
    },
    date: {
      type: Date,
      default: Date.now,
      required: [true, "Date is required"],
      unique: true,
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
        status: {
          type: String,
          enum: ["completed", "pending"],
          required: true,
        },
      },
    ],
    insights: {
      totalExpenses: { type: Number, default: 0 },
      junkFoodCount: { type: Number, default: 0 },
      topExpenseCategory: { type: String, default: "" },
      aiTips: { type: String },
    },
  },
  { timestamps: true }
);

const DayTask = mongoose.model("DayTask", dayTaskSchema);

export default DayTask;
