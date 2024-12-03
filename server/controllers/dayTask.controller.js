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
  const dayTasks = await DayTask.find({ clerkID });

  if (!dayTasks || dayTasks.length === 0) {
    return next(new AppError("No Data Found", 404));
  }

  // 3) Send Response
  res.status(200).json({
    status: "success",
    data: {
      dayTasks,
    },
  });
});

//! Create 🐧
const createDayTask = catchAsync(async (req, res, next) => {
  const { clerkID, date, expenses, junkFood, journal, todo } = req.body;

  // Check for Clerk ID and Date in the request
  if (!clerkID || !date) {
    return next(new AppError("Please provide Clerk ID and Date", 400));
  }

  // Try to find the existing DayTask entry for the given clerkID and date
  let dayTask = await DayTask.findOne({ clerkID, date });

  if (dayTask) {
    // Update the existing day task entry with the new data
    dayTask = await DayTask.findOneAndUpdate(
      { clerkID, date },
      {
        $push: {
          expenses: expenses || [],
          junkFood: junkFood || [],
          todo: todo || [],
        },
        $set: {
          journal: journal || dayTask.journal, // Update only if journal is provided
        },
      },
      { new: true }
    );
  } else {
    // If the DayTask doesn't exist, create a new one
    dayTask = await DayTask.create({
      clerkID,
      date,
      expenses: expenses || [],
      junkFood: junkFood || [],
      journal: journal || {},
      todo: todo || [],
    });
  }

  // Send the response with the created/updated data
  res.status(201).json({
    status: "success",
    data: {
      dayTask,
    },
  });
});

export { createDayTask, getDayTask };
