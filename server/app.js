import express from "express";
import cors from "cors";


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




app.get("/", (req, res) => {
  res.send("Hello World!");
});

//! 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); // ❌ Handle undefined routes
});


export { app }; // 📤 Export the app