import mongoose from "mongoose";
import { calculateStreak } from "../lib/extras.js";


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
        "weekdays",
        "mon-wed-fri",
        "tue-thu-sat",
        "mon-sat",
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
      default: Date.now,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "End date must be after the start date.",
      },
    },
    completedDates: {
      type: [Date], // Array of dates the habit was completed
      default: [],
    },
  },
  { timestamps: true }
);

// Index for unique habitName for each clerk and habitName
habitsSchema.index({ habitName: 1, clerkID: 1 }, { unique: true }); // Use clerkID here


//! Pre-save hook to update streak and highest streak 🔥
habitsSchema.pre("save", function (next) {
  const habit = this;

  // Calculate the current streak based on completedDates
  const currentStreak = calculateStreak(habit.completedDates);

  // Set the current streak
  habit.streak = currentStreak;

  // Update the highest streak if the current streak is greater
  if (habit.streak > habit.highestStreak) {
    habit.highestStreak = habit.streak;
  }

  next(); // Proceed with saving the habit
});

const Habits = mongoose.model("habits", habitsSchema);

export default Habits;
