import { matchedData, validationResult } from "express-validator";
import Recipe from "../models/recipe.js";
import Tag from "../models/tag.js";

export const createRecipe = async (req, res) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      const { title, description, method } = matchedData(req);
      const newRecipe = await Recipe.create({
        user: req.user._id,
        title,
        description,
        method,
        tags: req.body.tags,
      });
      res.status(201).send(newRecipe);
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
  }
};

export const getRecipe = async (req, res) => {
  const { slug } = req.params;
  try {
    const recipe = await Recipe.findOne({ slug })
      .populate("user", "name date_joined")
      .populate("tags", "name slug");
    if (!recipe) return res.send(404).send("Recipe not found");
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getRecipes = async (req, res) => {
  const errors = validationResult(req);
  try {
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
      if (searchString) {
        const recipes = await Recipe.paginate(
          {
            $or: [
              { title: { $regex: new RegExp(searchString, "i") } },
              { description: { $regex: new RegExp(searchString, "i") } },
            ],
          },
          options
        );
        return res.send(recipes);
      }
      const recipes = await Recipe.paginate({}, options);
      res.send(recipes);
    } else {
      res.status(400).send({
        field: firstError.path,
        value: firstError.value ? firstError.value : null,
        message: firstError.msg,
      });
    }
  } catch (error) {
    console.log(error);
    res.send(500).send(error.message);
  }
};

export const updateRecipe = async (req, res) => {
  const { slug } = req.params;
  const errors = validationResult(req);
  try {
    const existingRecipe = await Recipe.findOne({ slug }, "user");
    if (!existingRecipe) throw new Error("Recipe does not exist");
    if (existingRecipe.user.toString() !== req.user._id.toString())
      return res.status(403).send({
        success: false,
        message: "You do not have authorization to perform this action",
      });
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
};

export const deleteRecipe = async (req, res) => {
  const { slug } = req.params;
  try {
    const existingRecipe = await Recipe.findOne({ slug }, "user");
    if (!existingRecipe) throw new Error("Recipe does not exist");
    if (existingRecipe.user.toString() !== req.user._id.toString())
      return res.status(403).send({
        success: false,
        message: "You do not have authorization to perform this action",
      });
    await Recipe.findOneAndDelete({ slug });
    res.send({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getRecipeByTag = async (req, res) => {
  const { slug } = req.params;
  try {
    const tag = await Tag.findOne({ slug }, "name");
    if (!tag) return res.status(404).send("Tag does not exits");
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
      if (searchString) {
        const recipes = await Recipe.paginate(
          {
            tags: { $in: tag._id },
            $or: [
              { title: { $regex: new RegExp(searchString, "i") } },
              { description: { $regex: new RegExp(searchString, "i") } },
            ],
          },
          options
        );
        return res.send(recipes);
      }
      const recipes = await Recipe.paginate(
        { tags: { $in: tag._id } },
        options
      );
      res.send(recipes);
    } else {
      res.status(400).send({
        field: firstError.path,
        value: firstError.value ? firstError.value : null,
        message: firstError.msg,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving recipes");
  }
};
