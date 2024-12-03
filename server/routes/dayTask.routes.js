import Express from "express";
import {
  createDayTask,
  getDayTask,
} from "../controllers/dayTask.controller.js";

const router = Express.Router();

router.route("/").get(getDayTask).post(createDayTask);


export default router;