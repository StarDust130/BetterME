import express from 'express';
import { createJunkFood, deleteJunkFood, getJunkFoods, updateJunkFood } from '../controllers/junkFood.controller.js';




const router = express.Router();

// Create
router.post("/", createJunkFood)

// Read All
router.get("/", getJunkFoods)

// Read Today's junkFood
router.get("/today", getJunkFoods)

// Update
router.put("/:id", updateJunkFood)

// Delete
router.delete("/:id", deleteJunkFood)


export default router;
