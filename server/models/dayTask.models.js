import mongoose from "mongoose";

// Schema definition
const dayTaskSchema = new mongoose.Schema(
  {
    clerkID: {
      // 1) Clerk ID
      type: String,
      required: [true , "Clerk ID is Required"],
      index: true,
    },
    date: {
      // 2) Today Date
      type: Date,
      default: Date.now,
      required: [true , "Date is Required"],
      unique: true,
    },
    tasks: {
      // 3) Tasks
      expenses: [
        // 3.1) Expenses
        {
          title: String,
          amount: { type: Number, min: 0 },
        },
      ],
      junkFood: [
        // 3.2) junkFood
        {
          foodName: String,
          amount: { type: Number, min: 0 },
        },
      ],
      journal: { text: String }, // 3.3) Journal
      todo: [
        // 3.4) Todo
        {
          task: String,
          status: {
            type: String,
            enum: ["completed", "pending"],
          },
        },
      ],
    },
    insights: {  // 4) Insights
      totalExpenses: { type: Number, default: 0 },
      junkFoodCount: { type: Number, default: 0 },
      topExpenseCategory: String,
      aiTips: String,
    },
  },
  { timestamps: true }
);

const DayTask = mongoose.model("DayTask", dayTaskSchema);

export default DayTask;
