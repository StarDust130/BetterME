
import  {
  OverviewStats,
  ExpensesVsJunkTrend,
  HabitsProgress,
  TodosCompletionStats,
  DailyLogs,
} from "../controllers/stats.controller.js";
import Express from "express";

import validateClerkID from "../middlewares/validateClerkID.js";

const router = Express.Router();


router.get("/overviewStats", validateClerkID, OverviewStats);  //? Show overview stats 🌃

router.get("/expensesVsJunkTrend", validateClerkID, ExpensesVsJunkTrend); //? Show expenses vs junk trend 📈

router.get("/habitsProgress", validateClerkID, HabitsProgress); //? Show habits progress 🌇

router.get("/todosCompletionStats", validateClerkID, TodosCompletionStats); //? Show todos completion stats 📊

router.get("/dailyLogs", validateClerkID, DailyLogs); //? Show daily logs 📋 



export default router;
