import mongoose from "mongoose";

// weekdays -> Mon-Sat

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
    frequency: {
      type: [String], // Array of strings for days
      enum: [
        "daily",
        "weekdays",
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
habitsSchema.index({ habitName: 1, clerkId: 1 }, { unique: true });

const Habits = mongoose.model("habits", habitsSchema);

export default Habits;
