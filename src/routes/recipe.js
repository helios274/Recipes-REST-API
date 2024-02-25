import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipeByTag,
  getRecipes,
  getUserRecipes,
  updateRecipe,
} from "../controllers/recipe.js";
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

router
  .route("/:slug")
  .get(getRecipe)
  .put(isAuthenticated, checkSchema(recipeValidationSchema), updateRecipe)
  .delete(isAuthenticated, deleteRecipe);

router.get("/tags/:slug", checkSchema(queryValidationSchema), getRecipeByTag);

router.get("/user/:userId", getUserRecipes);

export default router;
