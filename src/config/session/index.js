import mongoose from "mongoose";
import MongoStore from "connect-mongo";

function sessionConfig() {
  return {
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
      secure: false,
    },
    store: new MongoStore({
      client: mongoose.connection.getClient(),
      dbName: process.env.DB_NAME,
      autoRemove: "native",
    }),
  };
}
export default sessionConfig;
