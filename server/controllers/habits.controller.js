import Habits from "../models/habits.model.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import { frequencyMap } from "../lib/extras.js";

//! Get 🦒 - Get all habits for a clerk
const getAllHabits = catchAsync(async (req, res, next) => {});

//! Create 🦆 - Create a new habit
const createHabits = catchAsync(async (req, res, next) => {
  // 1) Check Clerk ID (middleware check it)
  const clerkID = req.clerkID;

  // 2) Validate the request body (habitName, startDate, frequency, endDate)
  let { habitName, startDate, frequency, endDate } = req.body;

  if (!habitName || !startDate) {
    return next(new AppError("Habit name and start date are required", 400));
  }
  // 3) Prevent duplicates of habitName for the same user
  const existingHabit = await Habits.findOne({ habitName, clerkID });

  if (existingHabit) {
    return next(new AppError("Habit with the same name already exists", 400));
  }

  // 4) Check the frequency field
  if (frequencyMap[frequency]) {
    frequency = frequencyMap[frequency]; // Handle cases like "mon-sat"
  }

  // 5) Create a new habit in the database
  const newHabit = await Habits.create({
    clerkID,
    habitName,
    startDate,
    frequency,
    endDate,
  });
  // 6) Send the response
  res.status(201).json({
    status: "success",
    data: {
      habit: newHabit,
    },
  });
});

//! Mark as Done 🎯 - Mark a habit as done
const markCompletion = catchAsync(async (req, res, next) => {
  // 1) Check Clerk ID and habit ID
  const clerkID = req.clerkID;
  const { habitID } = req.query;

  if (!habitID) {
    return next(new AppError("Habit ID is required", 400));
  }

  const habit = await Habits.findOne({ clerkID, _id: habitID });

  if (!habit) {
    return next(new AppError("Habit not found", 404));
  }

  // 2) Format today's date in full ISO format
  const todayDate = new Date().toISOString().split("T")[0];
  const todayISO = new Date(todayDate).toISOString();

  console.log("todayDate:", todayDate);
  console.log("Formatted todayISO:", todayISO);

  // 3) Check if today's date is already in the array
  const index = habit.completedDates.findIndex(
    (date) => new Date(date).toISOString() === todayISO
  );

  if (index === -1) {
    // Add the date if not found
    habit.completedDates.push(todayISO);
  } else {
    // Remove the date if found
    habit.completedDates.splice(index, 1);
  }

  // 4) Remove duplicates (optional but safe)
  habit.completedDates = [...new Set(habit.completedDates)];

  // 5) Save the updated habit
  await habit.save();

  res.status(200).json({
    status: "success",
    message: `Habit successfully ${
      index === -1 ? "marked" : "removed"
    } for today 🥳`,
    data: { habit },
  });
});

//! updateHabit ⏺️ - Update (e.g., frequency, endDate)
const updateHabit = catchAsync(async (req, res, next) => {});

//! Delte 🗑️ - Delete a habit
const deleteHabit = catchAsync(async (req, res, next) => {});

export { createHabits, getAllHabits, markCompletion, deleteHabit, updateHabit };
