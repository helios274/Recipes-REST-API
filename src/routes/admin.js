import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createTag,
  deleteTag,
  getTag,
  getTags,
  getUsers,
  updateTag,
} from "../controllers/admin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
  tagValidationSchema,
  queryValidationSchema,
} from "../utils/validation/schemas.js";

const router = Router();

router.get(
  "/users",
  isAuthenticated,
  isAdmin,
  checkSchema(queryValidationSchema),
  getUsers
);
router.post(
  "/tags",
  isAuthenticated,
  isAdmin,
  checkSchema(tagValidationSchema),
  createTag
);
router.get(
  "/tags",
  isAuthenticated,
  isAdmin,
  checkSchema(queryValidationSchema),
  getTags
);
router
  .route("/tags/:id")
  .get(isAuthenticated, isAdmin, getTag)
  .patch(isAuthenticated, isAdmin, checkSchema(tagValidationSchema), updateTag)
  .delete(isAuthenticated, isAdmin, deleteTag);

export default router;
