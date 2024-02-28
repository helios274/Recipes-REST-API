import asyncHandler from "express-async-handler";
import { validationResult, matchedData } from "express-validator";
import slugify from "slugify";
import mongoose from "mongoose";
import User from "../models/user.js";
import Tag from "../models/tag.js";
import { formatString } from "../utils/helpers.js";
import ValidationError from "../utils/errors/ValidationError.js";

// users

export const getUsers = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const queryParams = matchedData(req);
    const searchString = queryParams.search;
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const customLabels = {
      totalDocs: "totalUsers",
      docs: "users",
    };
    const options = {
      page,
      limit,
      customLabels,
      select: "-password -__v",
    };
    let query = {};
    if (searchString) {
      query = {
        $or: [
          { email: { $regex: new RegExp(searchString, "i") } },
          { "name.first": { $regex: new RegExp(searchString, "i") } },
          { "name.last": { $regex: new RegExp(searchString, "i") } },
          { bio: { $regex: new RegExp(searchString, "i") } },
        ],
      };
    }
    const users = await User.paginate(query, options);
    res.send(users);
  } else throw new ValidationError(errors);
});

// tags

export const createTag = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const data = matchedData(req);
    const name = formatString(data.name);
    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      res.statusCode = 400;
      throw new Error("Tag already exists");
    }
    const newTag = await Tag.create({
      name,
      slug: slugify(name, { lower: true }),
      user: req.user._id,
    });
    let responseData = {
      success: true,
      message: "New tag created successfully",
    };
    if (!req.user.is_admin) {
      responseData.tag = {
        _id: newTag._id,
        name: newTag.name,
        slug: newTag.slug,
      };
    } else {
      responseData.tag = newTag;
    }

    res.status(201).send(responseData);
  } else throw new ValidationError(errors);
});

export const getTag = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.statusCode = 400;
    throw new Error("Invalid tag ID");
  }
  const tag = await Tag.findById(req.params.id, "-user -__v");
  if (!tag) {
    res.statusCode = 404;
    throw new Error("Tag not found");
  }
  res.send(tag);
});

export const getTags = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
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
    let query = {};
    if (searchString) {
      query = {
        name: { $regex: new RegExp(searchString, "i") },
      };
    }
    const tags = await Tag.paginate(query, options);
    res.send(tags);
  } else throw new ValidationError(errors);
});

export const updateTag = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.statusCode = 400;
    throw new Error("Invalid tag ID");
  }
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
      res.statusCode = 404;
      throw new Error("Tag not found");
    }
    res.send({
      success: true,
      message: "Tag updated successfully",
    });
  } else throw new ValidationError(errors);
});

export const deleteTag = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.statusCode = 400;
    throw new Error("Invalid tag ID");
  }
  const deletedTag = await Tag.findByIdAndDelete(req.params.id);
  if (!deletedTag) {
    res.statusCode = 404;
    throw new Error("Tag not found");
  }
  res.send({
    success: true,
    message: "Tag deleted successfully",
  });
});
