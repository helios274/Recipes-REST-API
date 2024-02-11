import asyncHandler from "express-async-handler";
import { validationResult, matchedData } from "express-validator";
import slugify from "slugify";
import User from "../models/user.js";
import Tag from "../models/tag.js";
import { formatString } from "../utils/helpers.js";

// users

export const getUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const customLabels = {
    totalDocs: "totalUsers",
    docs: "Users",
  };
  const options = {
    page,
    limit,
    customLabels,
    select: "_id email name date_joined",
  };
  try {
    const allUsers = await User.paginate({}, options);
    return res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
});

// tags

export const createTag = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = matchedData(req);
      const name = formatString(data.name);
      const existingTag = await Tag.findOne({ name });
      if (existingTag) throw new Error("Tag already exists");
      const newTag = await Tag.create({
        name,
        slug: slugify(name, { lower: true }),
        user: req.user._id,
      });
      res.status(201).send(newTag);
    } else {
      const firstError = errors.array()[0];
      res.status(400).send({
        field: firstError.path,
        value: firstError.value ? firstError.value : null,
        message: firstError.msg,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

export const getTag = asyncHandler(async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).send({
        success: false,
        error: "Tag not found",
      });
    }
    res.send({
      success: true,
      tag: tag,
    });
  } catch (error) {
    console.log(error);
  }
});

export const getTags = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      const queryParams = matchedData(req);
      const searchString = queryParams.search;
      const page = parseInt(queryParams.page) || 1;
      const limit = parseInt(queryParams.limit) || 10;
      const customLabels = {
        totalDocs: "totalTags",
        docs: "tags",
      };
      const options = {
        page,
        limit,
        customLabels,
        sort: { name: 1 },
        select: "_id name slug",
      };

      if (searchString) {
        const tags = await Tag.paginate(
          {
            name: { $regex: new RegExp(searchString, "i") },
          },
          options
        );
        return res.send(tags);
      }
      const tags = await Tag.paginate({}, options);
      res.send(tags);
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
});

export const updateTag = asyncHandler(async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = matchedData(req);
      const name = formatString(data.name);
      const updatedTag = await Tag.findOneAndUpdate(
        { _id: req.params.id },
        { name, slug: slugify(name, { lower: true }) },
        { new: true }
      );
      if (!updatedTag) {
        return res.status(404).send({
          success: false,
          error: "Tag does not exists",
        });
      }
      res.send({
        success: true,
        message: "Tag updated successfully",
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
  }
});

export const deleteTag = asyncHandler(async (req, res) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) {
      return res.status(404).send({
        success: false,
        error: "Tag does not exists",
      });
    }
    res.send({
      success: true,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});
