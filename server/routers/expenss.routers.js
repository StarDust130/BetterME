import express from "express";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expenses.controller.js";

const router = express.Router();

// Create
router.post("/", createExpense);

// Read All
router.get("/", getExpenses);

// Read Today's Expenses
router.get("/today", getExpenses);

// Update
router.put("/:id", updateExpense);

// Delete
router.delete("/:id", deleteExpense);

export default router;
