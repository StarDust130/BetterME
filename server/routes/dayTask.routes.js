import Express from "express";
import {
  createDayTask,
  deleteDayTask,
  getDayTask,
  getTodayTask,
} from "../controllers/dayTask.controller.js";
import validateClerkID from "../middlewares/validateClerkID.js";

const router = Express.Router();

router
  .route("/")
  .get(validateClerkID, getDayTask) //? Get all tasks
  .post( createDayTask) //? Create a new task
  .delete(validateClerkID, deleteDayTask); //? Delete a task

router.get("/today", getTodayTask);

export default router;

