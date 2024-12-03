import Express from "express";
import {
  createDayTask,
  deleteDayTask,
  getDayTask,
} from "../controllers/dayTask.controller.js";

const router = Express.Router();

router.route("/").get(getDayTask).post(createDayTask);

router.delete("/", deleteDayTask);

export default router;
