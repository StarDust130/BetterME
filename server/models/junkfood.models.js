import mongoose from "mongoose";

const junkFoodSchema = new mongoose.Schema(
  {
    clerkID: {
      type: String,
      required: true,
      index: true,
    },
    isEatenToday: {
      type: Boolean,
      default: false,
    },
    foodName: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      min: [0, "Amount must be a positive number"],
    },
    category: {
      type: String,
      enum: [
        "Fast Food",
        "Snacks",
        "Sweets",
        "Beverages",
        "Home Made Junk",
        "Others",
      ],
    },
  },
  { timestamps: true }
);

const JunkFood = mongoose.model("JunkFood", junkFoodSchema);

export default JunkFood;

