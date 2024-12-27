
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


router.get("/overviewStats", validateClerkID, OverviewStats);  //? Show overview stats 🌃 (4 Cards)

router.get("/expensesVsJunkTrend", validateClerkID, ExpensesVsJunkTrend); //? Show expenses vs junk trend 📈 (Bar Chart)

router.get("/habitsProgress", validateClerkID, HabitsProgress); //? Show habits progress 🌇 (Circular Chart)

router.get("/todosCompletionStats", validateClerkID, TodosCompletionStats); //? Show todos completion stats 📊(Stacked Bar Chart)

router.get("/dailyLogs", validateClerkID, DailyLogs); //? Show daily logs 📋  (Cards show daily activity)



export default router;
