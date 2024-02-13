import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import User from "../models/user.js";

export const userProfile = asyncHandler(async (req, res) => {
  const userId = req.params?.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      throw new Error("Invalid user ID");
    if (req.user && userId === req.user._id.toString()) {
      return res.send(req.user);
    }
    const userData = await User.findById(userId, "-password -__v");
    if (!userData) return res.status(404).send("User not found");
    res.send(userData);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
