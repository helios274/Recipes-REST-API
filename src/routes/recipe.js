import { Router } from "express";
import { createRecipe, getRecipe, getRecipes } from "../controllers/recipe.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  queryValidationSchema,
  recipeValidationSchema,
} from "../utils/validationSchemas.js";
import { checkSchema } from "express-validator";

const router = Router();

router
  .route("")
  .get(checkSchema(queryValidationSchema), getRecipes)
  .post(isAuthenticated, checkSchema(recipeValidationSchema), createRecipe);

router.route("/:slug").get(getRecipe);

export default router;
