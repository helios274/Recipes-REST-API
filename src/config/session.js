import mongoose from "mongoose";
import MongoStore from "connect-mongo";

function sessionConfig() {
  return {
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 3,
      secure: process.env.IS_DEVELOPMENT ? false : true,
    },
    store: new MongoStore({
      client: mongoose.connection.getClient(),
      dbName: process.env.DB_NAME,
      autoRemove: "native",
    }),
  };
}
export default sessionConfig;
