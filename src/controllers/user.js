import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { validationResult, matchedData } from "express-validator";
import User from "../models/user.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.params?.id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.statusCode = 400;
    throw new Error("Invalid user ID");
  }
  if (req.user && userId === req.user._id.toString()) {
    return res.send(req.user);
  }
  const userData = await User.findById(userId, "-password -__v");
  if (!userData) {
    res.statusCode = 404;
    throw new Error("User not found");
  }
  res.send(userData);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.params?.id;
  const errors = validationResult(req);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.statusCode = 400;
    throw new Error("Invalid user ID");
  }
  if (userId !== req.user._id.toString()) {
    res.statusCode = 401;
    throw new Error("You are not authorized to perform this action");
  }
  if (errors.isEmpty()) {
    const data = matchedData(req);
    if (Object.keys(data).length === 0) {
      res.statusCode = 400;
      throw new Error("No data provided in the body");
    }
    await User.findByIdAndUpdate(userId, {
      name: {
        first: data?.first_name || req.user.name.first,
        last: data?.last_name || req.user.name.last,
      },
      bio: data?.bio || req.user.bio || null,
    });
    res.send({
      success: true,
      message: "Profile updated successfully",
    });
  } else throw new ValidationError(errors);
});
