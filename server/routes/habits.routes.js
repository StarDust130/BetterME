import Express from 'express';
import { createHabits } from '../controllers/habits.controller';


const router = Express.Router();

// Create a new habit
router.post("/" , createHabits);



export default router;