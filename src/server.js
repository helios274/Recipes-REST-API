import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import connectMongoDB from "./db/mongoDB.js";
import routes from "./routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
connectMongoDB();

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 3, // 3 hrs
      secure: process.env.IS_DEVELOPMENT ? false : true,
    },
    store: new MongoStore({
      client: mongoose.connection.getClient(),
      dbName: process.env.DB_NAME,
      autoRemove: "native",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

if (process.env.IS_DEVELOPMENT) {
  app.listen(PORT, () => {
    console.log("-----------------------------");
    console.log(` Server running at port ${PORT}`);
    console.log("-----------------------------");
  });
} else {
  app.listen(PORT);
}
