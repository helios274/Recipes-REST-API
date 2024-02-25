import asyncHandler from "express-async-handler";
import { validationResult, matchedData } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import ValidationError from "../utils/errors/ValidationError.js";

export const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const data = matchedData(req);
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      res.statusCode = 400;
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    await User.create({
      email: data.email,
      password: hashedPassword,
      name: {
        first: data.first_name,
        last: data.last_name,
      },
    });
    res.status(201).send({
      success: true,
      message: "User created successfully",
    });
  } else throw new ValidationError(errors);
});

export const loginUser = asyncHandler(async (req, res) => {
  res.send({
    success: true,
    message: "Logged in successfully",
  });
});

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      res.statusCode = 500;
      throw new Error(err.message);
    }
    req.session.destroy();
    res.send({
      success: true,
      message: "Logged out successfully",
    });
  });
};
