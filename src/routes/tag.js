import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createTag, getTag, getTags } from "../controllers/admin.js";
import { checkSchema } from "express-validator";
import {
  queryValidationSchema,
  tagValidationSchema,
} from "../utils/validationSchemas.js";

const router = Router();

/**
 * @swagger
 * /tags:
 *   post:
 *     tags: [Tags]
 *     summary: Create new tag
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateTagResponse'
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
router.post("", isAuthenticated, checkSchema(tagValidationSchema), createTag);

/**
 * @swagger
 * /tags:
 *   get:
 *     tags: [Tags]
 *     summary: Get tags
 *     description: Get all tags with pagination
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
 *               $ref: '#/components/schemas/GetTagsResponse'
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
 */
router.get("", checkSchema(queryValidationSchema), getTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     tags: [Tags]
 *     summary: Get a tag by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the tag
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSingleTagResponse'
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
router.get("/:id", getTag);

export default router;
