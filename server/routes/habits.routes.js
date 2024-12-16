import Express from "express";
import {
  createHabits,
  deleteHabit,
  getAllHabits,
  markCompletion,
  updateHabit,
} from "../controllers/habits.controller.js";
import validateClerkID from "../middlewares/validateClerkID.js";

const router = Express.Router();


router.post("/", validateClerkID, createHabits);  //? Create a new habit

router.get("/", validateClerkID, getAllHabits); //? Get all  habits

router.patch("/", validateClerkID, updateHabit); //? Update a  habit

router.delete("/", validateClerkID, deleteHabit); //? Delete a habit 

router.patch("/markCompletion", validateClerkID, markCompletion); //? Mark a habit as done 



export default router;
