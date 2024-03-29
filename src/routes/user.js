import { Router } from "express";
import { updateProfile, getProfile } from "../controllers/user.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { checkSchema } from "express-validator";
import { profileValidationSchema } from "../utils/validationSchemas.js";

const router = Router();

/**
 * @swagger
 * /user/profile:
 *   get:
 *     tags: [User]
 *     summary: Get current user profile
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProfileResponse'
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
router.get("/profile", isAuthenticated, getProfile);

/**
 * @swagger
 * /user/profile:
 *   patch:
 *     tags: [User]
 *     summary: Update current user profile
 *     description: Update profile data of the current user. Only first name, last name, or bio can be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserBody'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateProfileResponse'
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
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProfileResponse'
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
router.get("/profile/:id", getProfile);

export default router;
