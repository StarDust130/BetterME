import { AppError } from "../lib/AppError.js";
import { catchAsync } from "../lib/catchAsync.js";
import DayTask from "../models/dayTask.models.js";

//! Expenes Stats 🤑
const ExpenesStats = catchAsync(async (req, res, next) => {});

//! JunkFood Stats 🍔
const JunkFoodStats = catchAsync(async (req, res, next) => {});

//! Todos Stats 📝
const TodosStats = catchAsync(async (req, res, next) => {});

//! Habits Stats 😉
const HabitsStats = catchAsync(async (req, res, next) => {});

//!  Day Wise  Stats 📅
const allDayStats = catchAsync(async (req, res, next) => {});

export { ExpenesStats, JunkFoodStats, TodosStats, HabitsStats, allDayStats };
