import { matchedData, validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Recipe from "../models/recipe.js";
import Tag from "../models/tag.js";
import ValidationError from "../utils/errors/ValidationError.js";
import User from "../models/user.js";

export const createRecipe = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { title, description, method, tags } = matchedData(req);
    tags.forEach((tag) => {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
        res.statusCode = 400;
        throw new Error("Invalid tag Id provided: " + tag);
      }
    });
    const newRecipe = await Recipe.create({
      user: req.user._id,
      title,
      description,
      method,
      tags,
    });
    res.status(201).send({
      success: true,
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } else throw new ValidationError(errors);
});

export const getRecipe = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const recipe = await Recipe.findOne({ slug })
    .populate("user", "name date_joined")
    .populate("tags", "name slug");
  if (!recipe) {
    res.statusCode = 404;
    throw new Error("Recipe not found");
  }
  res.send(recipe);
});

export const getRecipes = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const queryParams = matchedData(req);
    const searchString = queryParams.search;
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const customLabels = {
      totalDocs: "totalRecipes",
      docs: "recipes",
    };
    const options = {
      page,
      limit,
      customLabels,
      select: "-updatedAt -__v",
      populate: [
        { path: "user", select: "name" },
        { path: "tags", select: "name" },
      ],
    };
    let query = {};
    if (searchString) {
      query = {
        $or: [
          { title: { $regex: new RegExp(searchString, "i") } },
          { description: { $regex: new RegExp(searchString, "i") } },
        ],
      };
    }
    const recipes = await Recipe.paginate(query, options);
    res.send(recipes);
  } else throw new ValidationError(errors);
});

export const updateRecipe = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const existingRecipe = await Recipe.findOne({ slug }, "user");
  if (!existingRecipe) {
    res.statusCode = 404;
    throw new Error("Recipe does not exist");
  }
  if (existingRecipe.user.toString() !== req.user._id.toString()) {
    res.statusCode = 401;
    throw new Error("You do not have authorization to perform this action");
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { title, description, method, tags } = matchedData(req);
    await Recipe.findOneAndUpdate(
      { slug },
      { title, method, description, tags }
    );
    res.send({
      success: true,
      message: "Recipe updated successfully",
    });
  } else throw new ValidationError(errors);
});

export const deleteRecipe = async (req, res) => {
  const { slug } = req.params;
  const existingRecipe = await Recipe.findOne({ slug }, "user");
  if (!existingRecipe) {
    res.statusCode = 404;
    throw new Error("Recipe does not exist");
  }
  if (existingRecipe.user.toString() !== req.user._id.toString()) {
    res.statusCode = 401;
    throw new Error("You do not have authorization to perform this action");
  }
  await Recipe.findOneAndDelete({ slug });
  res.send({
    success: true,
    message: "Recipe deleted successfully",
  });
};

export const getRecipeByTag = async (req, res) => {
  const { slug } = req.params;
  const tag = await Tag.findOne({ slug }, "name");
  if (!tag) {
    res.statusCode = 404;
    throw new Error("Tag does not exists");
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const queryParams = matchedData(req);
    const searchString = queryParams.search;
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const customLabels = {
      totalDocs: "totalRecipes",
      docs: "recipes",
    };
    const options = {
      page,
      limit,
      customLabels,
      select: "-updatedAt -__v",
      populate: [
        { path: "user", select: "name" },
        { path: "tags", select: "name" },
      ],
    };
    let query = { tags: { $in: tag._id } };
    if (searchString)
      query = {
        tags: { $in: tag._id },
        $or: [
          { title: { $regex: new RegExp(searchString, "i") } },
          { description: { $regex: new RegExp(searchString, "i") } },
        ],
      };
    const recipes = await Recipe.paginate(query, options);
    res.send(recipes);
  } else throw new ValidationError(errors);
};

export const getUserRecipes = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.statusCode = 400;
    throw new Error("Invalid user ID");
  }
  const user = await User.findById(userId);
  if (!user) {
    res.statusCode = 404;
    throw new Error("User does not exits");
  }
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const queryParams = matchedData(req);
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const customLabels = {
      totalDocs: "totalRecipes",
      docs: "recipes",
    };
    const options = {
      page,
      limit,
      customLabels,
      select: "-updatedAt -__v",
      populate: [{ path: "tags", select: "name" }],
    };
    const recipes = await Recipe.paginate({}, options);
    res.send(recipes);
  } else throw new ValidationError(errors);
});
