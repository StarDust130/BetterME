import Habits from "../models/habits.model.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import { frequencyMap } from "../lib/extras.js";

//! Get 🦒 - Get all habits for a clerk
const getAllHabits = catchAsync(async (req, res, next) => {
  // 1) Check Clerk ID (middleware check it)
  const clerkID = req.clerkID;

  // 2) Get all habits for the clerk
  // Get the current day of the week (e.g., "wed" for Wednesday)
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDay = days[new Date().getDay()];

  // Query habits that match the conditions
  const habits = await Habits.find({
    clerkID,
    $or: [
      { frequency: "daily" }, // Include habits with "daily" frequency
      { frequency: currentDay }, // Include habits for the current day
    ],
  });

  res.status(200).json({
    status: "success",
    total: habits.length,
    data: {
      habits,
    },
  });
});

//! Create 🦆 - Create a new habit
const createHabits = catchAsync(async (req, res, next) => {
  // 1) Check Clerk ID (middleware check it)
  const clerkID = req.clerkID;

  // 2) Validate the request body (habitName, startDate, frequency, endDate)
  let { habitName, startDate, frequency, endDate, completedDates } = req.body;

  if (!habitName) {
    return next(new AppError("Habit name  required", 400));
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
    startDate: new Date().toISOString().split("T")[0],
    frequency,
    endDate,
    completedDates,
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
  const clerkID = req.clerkID;
  const { habitID } = req.query;

  if (!habitID) {
    return next(new AppError("Habit ID is required", 400));
  }
  // 1) Find the habit by ID
  const habit = await Habits.findOne({ clerkID, _id: habitID });

  if (!habit) {
    return next(new AppError("Habit not found", 404));
  }

  // 2) Format today's date
  const todayDate = new Date().toISOString().split("T")[0];

  // 3) Validate and filter completedDates
  habit.completedDates = habit.completedDates.filter((date) => {
    const isValid = !isNaN(new Date(date));
    if (!isValid) {
      console.warn(`Invalid date removed: ${date}`);
    }
    return isValid;
  });

  // 4) Check if today's date is already in the array
  const index = habit.completedDates.findIndex((date) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    return formattedDate === todayDate;
  });

  if (index === -1) {
    // Add today's date if not found
    habit.completedDates.push(todayDate);
  } else {
    // Remove today's date if found
    habit.completedDates.splice(index, 1);
  }

  // 5) Remove duplicates and save the updated habit
  habit.completedDates = [...new Set(habit.completedDates)];

  // 6) Save the updated habit
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
const updateHabit = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { habitID } = req.query;
  const { habitName, frequency, endDate } = req.body;

  if (!habitID) {
    return next(new AppError("Habit ID is required", 400));
  }

  // 1) Find the habit by ID
  const habit = await Habits.findOne({ clerkID, _id: habitID });

  if (!habit) {
    return next(new AppError("Habit not found", 404));
  }

  // 2) Check the frequency field
  if (frequency) {
    if (frequencyMap[frequency]) {
      habit.frequency = frequencyMap[frequency]; // Handle cases like "mon-sat"
    } else {
      habit.frequency = frequency;
    }
  }

  // 3) Check the endDate field
  if (endDate) {
    habit.endDate = endDate;
  }

  // 4) Check the habitName field
  if (habitName) {
    habit.habitName = habitName;
  }

  // 4) Save the updated habit
  await habit.save();

  res.status(200).json({
    status: "success",
    message: "Habit updated successfully 🥳",
    data: { habit },
  });
});

//! Delete 🗑️ - Delete a habit
const deleteHabit = catchAsync(async (req, res, next) => {
  const clerkID = req.clerkID;
  const { habitID } = req.query;

  if (!habitID) {
    return next(new AppError("Habit ID is required", 400));
  }
  // 1) Find the habit by ID
  const habit = await Habits.deleteOne({ clerkID, _id: habitID });

  if (!habit) {
    return next(new AppError("Habit not found", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Habit deleted successfully 🥳",
  });
});

export { createHabits, getAllHabits, markCompletion, deleteHabit, updateHabit };
