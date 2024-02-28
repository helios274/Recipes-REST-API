import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { validationResult, matchedData } from "express-validator";
import User from "../models/user.js";
import ValidationError from "../utils/errors/ValidationError.js";

export const getProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  if (!userId) return res.send(req.user);
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
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const data = matchedData(req);
    if (Object.keys(data).length === 0) {
      res.statusCode = 400;
      throw new Error("No data provided in the body");
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: {
          first: data?.first_name || req.user.name.first,
          last: data?.last_name || req.user.name.last,
        },
        bio: data?.bio || req.user.bio || null,
      },
      { select: "-password -__v" }
    );
    res.send({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } else throw new ValidationError(errors);
});
