import { AppError } from "../lib/AppError.js";

// 🛠️ Send detailed error during development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false, // ❌ Request failed
    status: err.status, // 🏷️ HTTP status
    error: err, // 📋 Complete error object
    message: err.message, // 🗨️ Error message for debugging
    stack: err.stack, // 🔍 Stack trace for detailed error tracking
  });
};

// 🚨 Send simplified error response in production
const sendErrorProd = (err, res) => {
  // 🛠️ If the error is operational (trusted), show safe error message
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false, // ❌ Request failed
      status: err.status, // 🏷️ HTTP status
      message: err.message, // 📩 Safe error message for the user
    });
  } else {
    // 💥 Unknown or programming error
    console.error("ERROR 💥", err); // 📋 Log the full error

    // 🛑 Send a generic message (don't expose details to the client)
    res.status(500).json({
      success: false, // ❌ Request failed
      status: "error", // 🔴 General error
      message: "Something went very wrong!", // 🚨 General error message
    });
  }
};

// 🔍 Handle specific DB errors

// 🛠️ CastError: When the input type is incorrect (e.g., ID is not valid)
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`; // 📩 Custom error message
  return new AppError(message, 400); // 🚨 Return a new AppError with status 400 (Bad Request)
};

// 🛠️ Duplicate field error (e.g., unique values in the DB)
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // 🔍 Extract duplicate value
  const message = `Duplicate field value: ${value}. Please use another value!`; // 📩 Custom message
  return new AppError(message, 400); // 🚨 Return new AppError
};

// 🛠️ ValidationError: When input doesn't match schema (e.g., missing fields)
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); // 📝 Collect all validation errors
  const message = `Invalid input data. ${errors.join(". ")}`; // 📩 Custom error message
  return new AppError(message, 400); // 🚨 Return new AppError
};

// 🛡️ Invalid JWT error handler
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401); // 🚨 Unauthorized error

// 🛡️ Expired JWT error handler
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401); // 🚨 Unauthorized error

// 🌐 Global error handler
export const globalErrorHandler = (err, req, res, next) => {
  console.log(err.stack); // 📝 Log the error stack 📚

  err.statusCode = err.statusCode || 500; // 📍 Default to 500 if no status code
  err.status = err.status || "error 😿"; // 📍 Default to generic error status

  // 🔧 If in development mode, send full error details
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);

    // 🚨 In production mode, handle specific errors and send simplified messages
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err); // 🛠️ Handle invalid DB IDs
    if (err.code === 11000) err = handleDuplicateFieldsDB(err); // 🛠️ Handle duplicate fields
    if (err.name === "ValidationError") err = handleValidationErrorDB(err); // 🛠️ Handle validation errors
    if (err.name === "JsonWebTokenError") err = handleJWTError(); // 🛡️ Handle invalid JWT
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError(); // ⏳ Handle expired JWT

    return sendErrorProd(err, res); // 🚨 Send error response in production
  }
};
