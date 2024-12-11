import { app } from "./app.js";
import { PORT } from "./constant.js";
import { connectDB } from "./db/connectDB.js";
import "dotenv/config";

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected successfully 🎉");

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT} 🚀`);
    });
  } catch (error) {
    console.log("Error starting the server 💥:", error.message);
    process.exit(1); // Exit process if any error occurs
  }
};

// Call the function to start the server 😮‍💨
startServer();
