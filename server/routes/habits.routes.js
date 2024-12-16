import Express from 'express';
import { createHabits } from '../controllers/habits.controller.js';
import validateClerkID from '../middlewares/validateClerkID.js';


const router = Express.Router();

// Create a new habit
router.post("/" ,validateClerkID , createHabits);



export default router;