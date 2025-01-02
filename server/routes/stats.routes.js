import {
  ExpensesStats,
  JunkFoodStats,
  TodosStats,
  HabitsStats,
  allDayStats,
} from "../controllers/stats.controller.js";
import Express from "express";

import validateClerkID from "../middlewares/validateClerkID.js";

const router = Express.Router();

router.get("/expenses", validateClerkID, ExpensesStats); //? Show expenses vs income trend 📈 (Line Chart)

router.get("/junkFoods", validateClerkID, JunkFoodStats); //? Show junk food consumption 🍔 (Pie Chart)

router.get("/todos", validateClerkID, TodosStats); //? Show todos completion stats 📊(Stacked Bar Chart)

router.get("/habits", validateClerkID, HabitsStats); //? Show habits completion stats 📊(Stacked Bar Chart)

router.get("/daily", validateClerkID, allDayStats); //? Show daily logs 📋  (Cards show daily activity)

export default router;
