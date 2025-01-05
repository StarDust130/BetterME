import express from "express";
import cors from "cors";
import dayTaskRoutes from "./routes/dayTask.routes.js"; // 📅 DayTask Routes
import habitsRouter from "./routes/habits.routes.js"; // 🤑 Habits Routes
import statsRouter from "./routes/stats.routes.js"; // 📊 Stats Routes
import { AppError } from "./lib/AppError.js";
import { globalErrorHandler } from "./controllers/error.controller.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();

//! Global Middleware

//? 🛡️ Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // 🌐 Allow requests from CLIENT_URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // 🔧 Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // 🧰 Allowed headers
    credentials: true, // 🎫 Allow credentials (cookies, headers, etc.)
  })
);

// app.use(cors({ origin: "*" }));


app.use(express.json({ limit: "10kb" })); // 📝 Parse JSON requests

//! Routes 🎠
app.use("/api/v1/dayTask", dayTaskRoutes); // 📅 DayTask Routes
app.use("/api/v1/habits", habitsRouter); // 🤑 Habits Routes
app.use("/api/v1/stats", statsRouter); // 📊 Stats Routes


//! 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // ❌ Handle undefined routes
});

//! Global Error Handler
app.use(globalErrorHandler); // 🛑 Use global error handler

export { app }; // 📤 Export the app
