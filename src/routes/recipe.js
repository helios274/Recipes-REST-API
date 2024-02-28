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
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         type: integer
 *       - name: search
 *         in: query
 *         description: Search term for filtering recipes
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecipesResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
 *   post:
 *     tags: [Recipes]
 *     summary: Create a new recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRecipeBody'
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRecipeResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400ErrorResponse'
 *       403:
 *         description: Unauthenticated Access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/403ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSingleRecipeResponse'
 *       404:
 *         description: Not found error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
 *   put:
 *     tags: [Recipes]
 *     summary: Update a recipe
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug of the required recipe
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateRecipeBody'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400ErrorResponse'
 *       404:
 *         description: Not found error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
 *   delete:
 *     tags: [Recipes]
 *     summary: Delete a recipe
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: Slug of the required recipe
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Not found error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecipesResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400ErrorResponse'
 *       404:
 *         description: Not found error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecipesResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400ErrorResponse'
 *       404:
 *         description: Not found error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/404ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500ErrorResponse'
 */
router.get("/user/:userId", getUserRecipes);

export default router;
