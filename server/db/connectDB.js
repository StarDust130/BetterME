import mongoose from "mongoose";
const DB_NAME = "BetterME";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log(`MongoDB Connected: ${conn.connection.host} 🔥🎆`);
  } catch (error) {
    console.error(`Error 😿: ${error.message}`);
    process.exit(1);
  }
};


//!  this 2 error handlers stop the server from running when there is an error

//! Unhandled Rejection Error
process.on("unhandledRejection", (err, promise) => {
  console.log(
    "Unhandled Rejection Error. Shutting Down... 💣😞: ",
    err.message
  );
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
  
  
}
);


//! Uncaught Exception Error
process.on("uncaughtException", (err, promise) => {
  console.log("Uncaught Exception Error. Shutting Down... 💣🔮: ", err.message);
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
  
}
);