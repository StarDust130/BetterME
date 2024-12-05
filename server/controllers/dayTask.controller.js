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

//! Create 🐧 - Create or update today's DayTask.
const createDayTask = catchAsync(async (req, res, next) => {
  const { clerkID, expenses, junkFood, journal, todo } = req.body;

  // 1) Validate Clerk ID
  if (!clerkID) {
    return next(new AppError("Please provide Clerk ID", 400));
  }

  // 2) Get today's start and end timestamps (adjust for timezone consistency)
  const now = new Date();
  const startOfDay = new Date(now.setUTCHours(0, 0, 0, 0)); // Start of today in UTC
  const endOfDay = new Date(now.setUTCHours(23, 59, 59, 999)); // End of today in UTC

  // 3) Check if a DayTask exists for today using the `date` field
  let dayTask = await DayTask.findOne({
    clerkID,
    date: { $gte: startOfDay, $lte: endOfDay }, // Query by date field
  });

  if (dayTask) {
    // Update existing DayTask
    dayTask = await DayTask.findByIdAndUpdate(
      dayTask._id,
      {
        $push: {
          expenses: expenses || [],
          junkFood: junkFood || [],
          todo: todo || [],
        },
        $set: {
          journal: journal || dayTask.journal, // Update journal if provided
        },
      },
      { new: true } // Return the updated document
    );
  } else {
    // Create a new DayTask, adding the current date
    dayTask = await DayTask.create({
      clerkID,
      expenses: expenses || [],
      junkFood: junkFood || [],
      journal: journal || {},
      todo: todo || [],
      date: startOfDay, // Set the specific date for the task
    });
  }

  // 4) Send Response
  res.status(201).json({
    status: "success",
    message: dayTask
      ? "Day Task updated successfully 🎉"
      : "Day Task created successfully 🎉",
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
  const clerkID = req.query.clerkID; // Change from req.params to req.query

  console.log("clerkID from backend", clerkID);

  if (!clerkID) {
    return next(new AppError("Please provide Clerk ID", 400));
  }

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
