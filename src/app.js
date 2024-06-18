import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import connectMongoDB from "./config/db/mongoDB.js";
import sessionConfig from "./config/session/index.js";
import routes from "./routes/index.js";
import swaggerDocs from "./swagger/config.js";
import morganMiddleware from "./middlewares/morganLogger.js";

const app = express();

connectMongoDB();

if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

app.use(morganMiddleware);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(sessionConfig()));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

swaggerDocs(app);

export default app;
