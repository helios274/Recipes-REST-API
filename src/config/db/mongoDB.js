import mongoose from "mongoose";
import logger from "../logging/index.js";

const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "RecipesAPI",
    });
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(error.stack);
    process.exit(1);
  }
};

export default connectMongoDB;
