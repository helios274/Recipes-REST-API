import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import connectMongoDB from "./config/db/mongoDB.js";
import sessionConfig from "./config/session/index.js";
import routes from "./routes/index.js";
import swaggerDocs from "./swagger/config.js";
import morganMiddleware from "./middlewares/morganLogger.js";

const app = express();

connectMongoDB();

app.use(morganMiddleware);
app.use(express.json());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.PRODUCTION_URL
        : `http://localhost:${process.env.PORT || 3000}`,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionConfig()));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

swaggerDocs(app);

export default app;
