import { app } from "./app.js";
import { PORT } from "./constant.js";
import { connectDB } from "./db/connectDB.js";
import "dotenv/config";



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT} 🚀`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed 💥: ", error);
    process.exit(1);
  });
