import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import JunkFood from "../models/junkFood.models.js";

//! Create ✏️
export const createJunkFood = catchAsync(async (req, res, next) => {
  const { clerkID, foodName, amount, category } = req.body;

  if (!clerkID || !foodName || !amount || !category) {
    return next(new AppError("All fields are required", 404));
  }

  const newJunkFood = new JunkFood({
    clerkID,
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
