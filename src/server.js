import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import connectMongoDB from "./config/db/mongoDB.js";
import sessionConfig from "./config/session.js";
import routes from "./routes/index.js";
import swaggerDocs from "./utils/swagger.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
connectMongoDB();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionConfig()));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

swaggerDocs(app);

if (process.env.IS_DEVELOPMENT) {
  app.listen(PORT, () => {
    console.log("-----------------------------");
    console.log(` Server running at port ${PORT}`);
    console.log("-----------------------------");
  });
} else {
  app.listen(PORT);
}
