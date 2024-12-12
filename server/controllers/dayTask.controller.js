import DayTask from "../models/dayTask.models.js";
import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";

//! Get 🐘
const getDayTask = catchAsync(async (req, res, next) => {
  // 1) Get Data from Query
  const clerkID = req.clerkID;

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
  const clerkID = req.clerkID;
  const { expenses, junkFood, journal, todo } = req.body;

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
//! Delete 🚄
const deleteDayTask = catchAsync(async (req, res, next) => {
  // Extract data from query and params
  const clerkID = req.clerkID;

  // Validate inputs
  if (!clerkID) {
    return next(new AppError("Please provide Clerk ID", 400));
  }

  const taskId = req.query.taskId; // The ID of the object to delete
  const field = req.query.field; // The field (e.g., 'todo', 'expenses', 'junkFood')
  
  console.log("Task ID:", taskId, "Field:", field);

  if (!taskId) {
    return next(new AppError("Please provide Task ID", 400));
  }

  if (!field || !['todo', 'expenses', 'junkFood'].includes(field)) {
    return next(new AppError("Invalid or missing field name", 400));
  }

  // Dynamically construct the $pull operation
  const update = {
    $pull: { [field]: { _id: taskId } }, // Pull the object with matching _id from the specified field
  };

  // Attempt to remove the object from the specified field
  const updatedDayTask = await DayTask.findOneAndUpdate(
    { clerkID }, // Match the document by clerkID
    update, // Apply the dynamic update
    { new: true } // Return the updated document
  );

  console.log("Updated Day Task:", updatedDayTask);

  if (!updatedDayTask) {
    return next(new AppError("No matching document or task found", 404));
  }

  // Send success response
  res.status(200).json({
    status: "success",
    message: `${field.slice(0, 1).toUpperCase() + field.slice(1)} item deleted successfully 🎉`,
    data: updatedDayTask,
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

//! Toggle isCompleted in Todo🚀
const isCompletedToggle = catchAsync(async (req, res, next) => {
  // 1) Check Clerk ID
  const clerkID = req.clerkID;

  // 2) Find the task by ID

  const taskID = req.query.taskID;

  if (!taskID) {
    return next(new AppError("Please provide Task ID", 400));
  }

  // 3) Find the todo by ID
  const task = await DayTask.findOne({
    clerkID,
    "todo._id": taskID,
  });

  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  // 4) Toggle the isCompleted field
  const updatedTask = await DayTask.findOneAndUpdate(
    {
      clerkID,
      "todo._id": taskID,
    },
    {
      $set: {
        "todo.$.isCompleted": !task.todo.id(taskID).isCompleted,
      },
    },
    { new: true }
  );

  // 5) Save the updated task
  await updatedTask.save();

  // 6) Send Response
  res.status(200).json({
    status: "success",
    message: "Task Updated Successfully 🎉",
    data: updatedTask,
  });
});

export {
  createDayTask,
  getDayTask,
  deleteDayTask,
  getTodayTask,
  isCompletedToggle,
};
