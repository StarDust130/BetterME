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
        priority: {
          type: String,
          enum: ["high", "medium", "low"],
          default: "low",
        },
      },
    ],
    date: {
      type: Date,
      required: true, // Ensure date is provided
      index: true, // Make sure it's indexed
    },
  },
  { timestamps: true }
);

const DayTask = mongoose.model("dayTask", dayTaskSchema);

export default DayTask;
