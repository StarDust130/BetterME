import express from "express";
import { getTodayActivity } from "../controllers/global.controller.js";


const router = express.Router();


router.get("/todayActivity", getTodayActivity);


export default router;