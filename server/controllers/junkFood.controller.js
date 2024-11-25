import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import JunkFood from "../models/junkFood.models.js";

//! Create ✏️
export const createJunkFood = catchAsync(async (req, res, next) => {
  const { clerkID,isEatenToday, foodName, amount, category } = req.body;

  if (!clerkID) {
    return next(new AppError("User is Not Login", 404));
  }

  const newJunkFood = new JunkFood({
    clerkID,
    isEatenToday,
    foodName,
    amount,
    category,
  });

  await newJunkFood.save();

  res
    .status(201)
    .json({ message: "Junk Food created successfully", newJunkFood });
});

//! Read all 📑
export const getJunkFoods = catchAsync(async (req, res) => {
  const junkFoods = await JunkFood.find({ clerkID: req.body.clerkID }).sort({
    createdAt: -1,
  });

  if (junkFoods.length === 0) {
    return res.status(404).json({ message: "No junk food found" });
  }

  res.status(200).json(junkFoods);
});

//! Update 🔄
export const updateJunkFood = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide an id", 404));
  }

  const { foodName, amount, category } = req.body;

  const updatedJunkFood = await JunkFood.findByIdAndUpdate(
    id,
    { foodName, amount, category },
    { new: true }
  );

  if (!updatedJunkFood) {
    return next(new AppError("No junk food found with that id", 404));
  }

  res
    .status(200)
    .json({ message: "Junk Food updated successfully", updatedJunkFood });
});

//! Delete 🗑️
export const deleteJunkFood = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError("Please provide an id", 404));
  }

  const deletedJunkFood = await JunkFood.findByIdAndDelete(id);

  if (!deletedJunkFood) {
    return next(new AppError("No junk food found with that id", 404));
  }

  res.status(204).json({ message: "Junk Food deleted successfully" });
});

//! Get Today's JunkFood 📅
export const getToday = catchAsync(async (req, res) => {
  // 1) Get the clerkID from the request body
  const { clerkID } = req.body;
  if (!clerkID) {
    return res.status(400).json({ message: "clerkID is required" });
  }

  // 2) Get the start and end of the current day
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

  // 3) Query the database
  const todayJunkFood = await JunkFood.find({
    clerkID: clerkID,
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  }).sort({ date: -1 }); // Sort by date in descending order

  // 4) Check if there are no expenses
  if (!todayJunkFood || todayJunkFood.length === 0) {
    return res.status(404).json({ message: "No expenses found for today" });
  }

  // 5) Return the expenses
  res.status(200).json(todayJunkFood);
});