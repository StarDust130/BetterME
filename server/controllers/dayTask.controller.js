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

  // 2) Fetch from DB
  const dayTask = await DayTask.findOne({ clerkID, date });

  // 3) Send Response
  res.status(200).json({
    status: "success",
    data: {
      dayTask,
    },
  });
});

//! Create 🐧
const createDayTask = catchAsync(async (req, res, next) => {
  // 1) Get Data from Body
  const { clerkID, date, tasks } = req.body;

  if (!clerkID) {
    return next(new AppError("Please Provide Clerk ID", 400));
  }

  // 2) Save to DB
  const dayTask = await DayTask.create({
    clerkID,
    date,
    tasks,
  });

  // 3) Send Response

  res.status(201).json({
    status: "success",
    data: {
      dayTask,
    },
  });
});

export { createDayTask , getDayTask };
