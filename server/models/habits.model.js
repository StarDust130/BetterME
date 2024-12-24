import mongoose from "mongoose";
import { updateStreakMiddleware } from "../lib/extras.js";

const habitsSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: [true, "Clerk ID is required"],
      index: true,
    },
    habitName: {
      type: String,
      required: [true, "Habit name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    streak: {
      type: Number,
      default: 0,
    },
    highestStreak: {
      type: Number,
      default: 0,
    },
    frequency: {
      type: [String], // Array of strings for days
      enum: [
        "daily",
        "mon-wed-fri",
        "tue-thu-sat",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat",
        "sun",
      ],
      default: ["daily"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      default: new Date().toISOString().split("T")[0],
    },
    completedDates: {
      type: [String], // Array of ISO strings for completed dates
      default: [],
    },
  },
  { timestamps: true }
);

// Index for unique habitName for each clerk and habitName
habitsSchema.index({ habitName: 1, clerkID: 1 }, { unique: true });

//! Pre-save hook to update streak and highest streak

// Apply the middleware to the schema
habitsSchema.pre("save", updateStreakMiddleware);

const Habits = mongoose.model("habits", habitsSchema);

export default Habits;
