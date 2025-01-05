import mongoose from "mongoose";

const DB_NAME = process.env.NODE_ENV === "production" ? "BetterME_Live" : "BetterME";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(`MongoDB Connected: ${conn.connection.host} 🔥🎆`);
    console.log(`Using Database: ${DB_NAME}`);
  } catch (error) {
    console.error(`Error 😿: ${error.message}`);
    process.exit(1);
  }
};
