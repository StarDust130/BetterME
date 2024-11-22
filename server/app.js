import express from "express";
import cors from "cors";
import  expensesRoutes from "./routers/expenss.routers.js"; // 💰 Expenses Routes
import { AppError } from "./lib/AppError.js";


const app = express();


//! Global Middleware

//? 🛡️ Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 🌐 Allow requests from CLIENT_URL
    methods: ["GET", "POST", "PUT", "DELETE" , "PATCH"], // 🔧 Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // 🧰 Allowed headers
    credentials: true, // 🎫 Allow credentials (cookies, headers, etc.)
  })
);

app.use(express.json({ limit: "10kb" })); // 📝 Parse JSON requests


//! Routes
app.use("/api/v1/expenses", expensesRoutes); // 💰 Expenses Routes

//! 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // ❌ Handle undefined routes
});


export { app }; // 📤 Export the app