import { AppError } from "../lib/AppError.js";

const validateClerkID = (req, res, next) => {
  const { clerkID } = req.query;
  console.log("clerkID from backend", clerkID);

  if (!clerkID) {
    return next(new AppError("Please provide Clerk ID", 400));
  }

  // Optionally: Validate Clerk ID format or length
  if (typeof clerkID !== "string" || clerkID.trim().length === 0) {
    return next(new AppError("Invalid Clerk ID format", 400));
  }

  // Attach `clerkID` to `req` for use in subsequent handlers
  req.clerkID = clerkID;

  next();
};

export default validateClerkID;
