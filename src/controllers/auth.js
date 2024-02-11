import asyncHandler from "express-async-handler";
import { validationResult, matchedData } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = matchedData(req);
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
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
      res.status(201).send("User created successfully");
    } else {
      const firstError = errors.array()[0];
      res.status(400).send({
        field: firstError.path,
        value: firstError.value,
        message: firstError.msg,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  res.send("User logged in successfully");
});

export const userProfile = asyncHandler(async (req, res) => {
  res.send({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    date_joined: req.user.date_joined,
    last_login: req.user.last_login,
  });
});

export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    req.session.destroy();
    res.send({
      success: true,
      message: "Logged out successfully",
    });
  });
};
