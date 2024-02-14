import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { validationResult, matchedData } from "express-validator";
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

export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.params?.id;
  const errors = validationResult(req);
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      throw new Error("Invalid user ID");
    if (userId !== req.user._id.toString())
      return res
        .status(403)
        .send("You are not authorized to perform this action");
    if (errors.isEmpty()) {
      const data = matchedData(req);
      if (Object.keys(data).length === 0) {
        return res.sendStatus(200);
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
    } else {
      const firstError = errors.array()[0];
      res.status(400).send({
        field: firstError.path,
        value: firstError.value ? firstError.value : null,
        message: firstError.msg,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
