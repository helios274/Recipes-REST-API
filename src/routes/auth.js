import { Router } from "express";
import { checkSchema } from "express-validator";
import passport from "passport";
import { createUser, loginUser, logoutUser } from "../controllers/auth.js";
import { userValidationSchema } from "../utils/validationSchemas.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import "../auth-strategies/localStrategy.js";

const router = Router();

router.post("/register", checkSchema(userValidationSchema), createUser);
router.post("/login", passport.authenticate("local"), loginUser);
router.post("/logout", isAuthenticated, logoutUser);

export default router;
