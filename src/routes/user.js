import { Router } from "express";
import { updateProfile, getProfile } from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { checkSchema } from "express-validator";
import { profileValidationSchema } from "../utils/validation/schemas.js";

const router = Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get current user profile
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetProfileResponse'
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
router.get("/profile", isAuthenticated, getProfile);

/**
 * @swagger
 * /user/profile:
 *   patch:
 *     tags: [User]
 *     summary: Update current user profile
 *     requestBody:
 *       $ref: '#/components/requests/UpdateProfileRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UpdateProfileResponse'
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
router.patch(
  "/profile",
  isAuthenticated,
  checkSchema(profileValidationSchema),
  updateProfile
);

/**
 * @swagger
 * /user/profile/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get profile of a user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         $ref: '#/components/responses/GetProfileResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.get("/profile/:id", getProfile);

export default router;
