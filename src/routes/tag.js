import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createTag, getTag, getTags } from "../controllers/admin.js";
import { checkSchema } from "express-validator";
import {
  queryValidationSchema,
  tagValidationSchema,
} from "../utils/validation/schemas.js";

const router = Router();

/**
 * @swagger
 * /tags:
 *   post:
 *     tags: [Tags]
 *     summary: Creates a new tag
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
 *         $ref: '#/components/responses/CreateTagResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
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
 *         $ref: '#/components/responses/GetTagsResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.get("", isAuthenticated, checkSchema(queryValidationSchema), getTags);

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
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetTagResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.get("/:id", isAuthenticated, getTag);

export default router;
