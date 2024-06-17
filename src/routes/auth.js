import { Router } from "express";
import { checkSchema } from "express-validator";
import passport from "passport";
import { createUser, loginUser, logoutUser } from "../controllers/auth.js";
import { userValidationSchema } from "../utils/validation/schemas.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import "../passport/local.strategy.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Registers a new user
 *     requestBody:
 *       $ref: '#/components/requests/CreateUserRequest'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.post("/register", checkSchema(userValidationSchema), createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Authentication]
 *     summary: Logins a user
 *     requestBody:
 *       $ref: '#/components/requests/LoginUserRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.post("/login", passport.authenticate("local"), loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags: [Authentication]
 *     summary: Logouts the current user
 *     responses:
 *       200:
 *         $ref: '#/components/responses/SuccessResponse'
 *       401:
 *         $ref: '#/components/responses/ForbiddenErrorResponse'
 *       403:
 *         $ref: '#/components/responses/UnauthorizedErrorResponse'
 *       500:
 *         $ref: '#/components/responses/InternalErrorResponse'
 */
router.post("/logout", isAuthenticated, logoutUser);

export default router;
