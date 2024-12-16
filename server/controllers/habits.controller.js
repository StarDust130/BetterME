import Habits from "../models/habits.model.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";

//! Create 🦆 - Create a new habit
const createHabits = catchAsync(async (req, res, next) => {
  // 1) Check Clerk ID (middleware check it)
  const clerkId = req.clerkId;

  // 2) Validate the request body (habitName, startDate, frequency, endDate)
  const { habitName, startDate, frequency, endDate } = req.body;

  if (!habitName || !startDate) {
    return next(new AppError("Habit name and start date are required", 400));
  }
  // 3) Prevent duplicates of habitName for the same user
  const existingHabit = await Habits.findOne({ habitName, clerkId });

  if (existingHabit) {
    return next(new AppError("Habit with the same name already exists", 400));
  }

  // 4) Create a new habit in the database
  const newHabit = await Habits.create({
    habitName,
    startDate,
    frequency,
    endDate,
    clerkId,
  });
  // 5) Send the response
  res.status(201).json({
    status: "success",
    data: {
      habit: newHabit,
    },
  });
});

export { createHabits };
