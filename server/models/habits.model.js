import mongoose from "mongoose";
import { isDayInFrequency } from "../lib/extras.js";

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
      type: [String], // Array of ISO strings for completed dates
      default: [],
    },
  },
  { timestamps: true }
);

// Index for unique habitName for each clerk and habitName
habitsSchema.index({ habitName: 1, clerkID: 1 }, { unique: true });

//! Pre-save hook to update streak and highest streak
habitsSchema.pre("save", function (next) {
  // Ensure dates are unique and sorted
  this.completedDates = [...new Set(this.completedDates)].sort();

  const frequencyDays = new Set(this.frequency); // Convert frequency to a Set for faster lookups
  let streak = 1; // Start streak count

  for (let i = this.completedDates.length - 1; i > 0; i--) {
    const currentDate = new Date(this.completedDates[i]);
    const previousDate = new Date(this.completedDates[i - 1]);

    // Get the day name of the previous date
    const previousDay = previousDate
      .toLocaleString("en-US", { weekday: "short" })
      .toLowerCase();

    // Check if the previous date matches the expected frequency
    if (
      frequencyDays.has(previousDay) &&
      currentDate - previousDate <= 7 * 24 * 60 * 60 * 1000 // At most 7 days apart
    ) {
      streak++; // Increase streak
    } else {
      break; // Break streak if it's not within frequency
    }
  }

  // Update streak and highest streak
  this.streak = streak;
  this.highestStreak = Math.max(this.highestStreak, this.streak);

  next();
});




const Habits = mongoose.model("habits", habitsSchema);

export default Habits;
