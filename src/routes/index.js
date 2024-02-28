import { Router } from "express";
import authRoutes from "./auth.js";
import adminRoutes from "./admin.js";
import userRoutes from "./user.js";
import recipeRoutes from "./recipe.js";
import tagRoutes from "./tag.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

router.get("", (req, res) => {
  res.send("Recipes API using ExpressJS and MongoDB");
});

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/admin", adminRoutes);
router.use("/api/v1/user", userRoutes);
router.use("/api/v1/recipes", recipeRoutes);
router.use("/api/v1/tags", tagRoutes);
router.use(errorHandler);

export default router;
