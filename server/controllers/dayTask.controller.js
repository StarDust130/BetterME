import DayTask from "../models/dayTask.models.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";

//! Get 🐘
const getDayTask = catchAsync(async (req, res, next) => {
  // 1) Get Data from Query
  const { clerkID } = req.query;

  if (!clerkID) {
    return next(new AppError("Please Provide Clerk ID", 400));
  }

  // 2) Fetch all entries for the clerkID
  const AllTasks = await DayTask.find({ clerkID });

  if (!AllTasks || AllTasks.length === 0) {
    return next(new AppError("No Data Found", 404));
  }

  // 3) Send Response
  res.status(200).json({
    status: "success",
    message: "Data Fetched Successfully 🎉",
    length: AllTasks.length,
    AllTasks,
  });
});

//! Create 🐧 - it create new dayTask and update today ones also.
const createDayTask = catchAsync(async (req, res, next) => {
  // 1) Get ClerkID from middleware
  const clerkID = req.clerkID;

  const { expenses, junkFood, journal, todo } = req.body;

  // 2) Get today's start and end timestamps
  const startOfDay = new Date().setHours(0, 0, 0, 0);
  const endOfDay = new Date().setHours(23, 59, 59, 999);

  // 3) Check if a DayTask already exists for today
  let dayTask = await DayTask.findOne({
    clerkID,
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  if (dayTask) {
    // Update the existing DayTask
    dayTask = await DayTask.findByIdAndUpdate(
      dayTask._id,
      {
        $push: {
          expenses: expenses || [],
          junkFood: junkFood || [],
          todo: todo || [],
        },
        $set: {
          journal: journal || dayTask.journal, // Only update journal if provided
        },
      },
      { new: true } // Return the updated document
    );
  } else {
    // Create a new DayTask
    dayTask = await DayTask.create({
      clerkID,
      expenses: expenses || [],
      junkFood: junkFood || [],
      journal: journal || {},
      todo: todo || [],
    });
  }

  // 4) Send response
  res.status(201).json({
    status: "success",
    message: "Day Task created successfully 🎉",
    dayTask,
  });
});

//! Delete 🚄
const deleteDayTask = catchAsync(async (req, res, next) => {
  // Extract data from query and params
  const { clerkID, _id } = req.query;

  // Validate inputs
  if (!clerkID) {
    return next(new AppError("Please provide Clerk ID", 400));
  }

  if (!_id) {
    return next(new AppError("Please provide Task ID", 400));
  }

  // Attempt to delete the task
  const deletedTask = await DayTask.findOneAndDelete({ _id, clerkID });

  if (!deletedTask) {
    return next(new AppError("No matching task found", 404));
  }

  // Send success response
  res.status(200).json({
    status: "success",
    message: "Day Task deleted successfully 🎉",
  });
});

//! Get today's task 🥙
const getTodayTask = catchAsync(async (req, res) => {
  const clerkID = req.clerkID;

  // Find today's task using createdAt
  const todayTask = await DayTask.findOne({
    clerkID,
    createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }, // Today at 00:00
  });

  if (!todayTask) {
    return res.status(200).json({
      status: "success",
      message: "No Task Found for Today",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Today's Task Fetched Successfully 🎉",
    data: todayTask,
  });
});

export { createDayTask, getDayTask, deleteDayTask, getTodayTask };
