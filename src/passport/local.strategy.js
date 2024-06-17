import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import AuthError from "../utils/errors/AuthError.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(
  asyncHandler(async (id, done) => {
    const findUser = await User.findById(id, "-password -__v");
    if (!findUser) throw new AuthError(404, "User not found");
    done(null, findUser);
  })
);

export default passport.use(
  new Strategy(
    { usernameField: "email" },
    asyncHandler(async (email, password, done) => {
      let findUser = await User.findOne({ email });
      if (!findUser) {
        throw new AuthError(404, "User doesn't exist");
      }
      const isUserValid = bcrypt.compare(password, findUser.password);
      if (!isUserValid) throw new AuthError(400, "Incorrect password");
      await User.updateOne({ email }, { $set: { last_login: Date.now() } });
      done(null, findUser);
    })
  )
);
