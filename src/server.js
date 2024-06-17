import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import logger from "./config/logging/index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production")
    logger.info(`Server running on ${PORT}`);
  else logger.info(`Server running at http://localhost:${PORT}`);
});
