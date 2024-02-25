import { Router } from "express";
import { updateProfile, getProfile } from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { checkSchema } from "express-validator";
import { profileValidationSchema } from "../utils/validationSchemas.js";

const router = Router();

router
  .route("/profile/:id")
  .get(getProfile)
  .put(isAuthenticated, checkSchema(profileValidationSchema), updateProfile);

export default router;
