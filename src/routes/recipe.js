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
} from "../utils/validation/schemas.js";
import { checkSchema } from "express-validator";

const router = Router();

/**
 * @swagger
 * /recipes:
 *   get:
 *     tags: [Recipes]
 *     summary: Get recipes
 *     description: Get all recipes with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         description: Search term for filtering recipes
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetRecipesResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 *   post:
 *     tags: [Recipes]
 *     summary: Create a new recipe
 *     requestBody:
 *       $ref: '#/components/requests/CreateRecipeRequest'
 *     responses:
 *       201:
 *         '#/components/responses/CreateRecipeResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */

router
  .route("")
  .get(checkSchema(queryValidationSchema), getRecipes)
  .post(isAuthenticated, checkSchema(recipeValidationSchema), createRecipe);

/**
 * @swagger
 * /recipes/{slug}:
 *   get:
 *     tags: [Recipes]
 *     summary: Get a recipe by slug
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug of the required recipe
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetRecipeResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 *   put:
 *     tags: [Recipes]
 *     summary: Updates a recipe
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug of the required recipe
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateRecipeBody'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/ForbiddenErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 *   delete:
 *     tags: [Recipes]
 *     summary: Delete a recipe
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug of the required recipe
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/ForbiddenErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router
  .route("/:slug")
  .get(getRecipe)
  .put(isAuthenticated, checkSchema(recipeValidationSchema), updateRecipe)
  .delete(isAuthenticated, deleteRecipe);

/**
 * @swagger
 * /recipes/tag/{slug}:
 *   get:
 *     tags: [Recipes]
 *     summary: Get all recipes by a tag
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug of the tag
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetRecipesResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.get("/tag/:slug", checkSchema(queryValidationSchema), getRecipeByTag);

/**
 * @swagger
 * /recipes/user/{userId}:
 *   get:
 *     tags: [Recipes]
 *     summary: Get all recipes of a user
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetRecipesResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.get("/user/:userId", getUserRecipes);

export default router;
