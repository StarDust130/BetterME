import { AppError } from "../lib/AppError.js";

const validateClerkID = (req, res, next) => {
  // Extract clerkID from multiple possible sources
  const clerkID =
    req.query?.clerkID || req.body?.clerkID || req.params?.clerkID;

  console.log("clerkID from backend:", clerkID);

  // Check if clerkID is missing
  if (!clerkID) {
    return next(new AppError("Clerk ID is required.", 400));
  }

  // Validate Clerk ID: Ensure it’s a non-empty string
  if (typeof clerkID !== "string" || !clerkID.trim()) {
    return next(new AppError("Clerk ID must be a non-empty string.", 400));
  }

  // Attach `clerkID` to `req` for use in subsequent handlers
  req.clerkID = clerkID.trim();

  next();
};

export default validateClerkID;
