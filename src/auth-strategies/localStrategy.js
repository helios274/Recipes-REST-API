import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.js";
import bcrypt from "bcrypt";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = await User.findById(id);
    if (!findUser) throw new Error("user not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      let findUser = await User.findOne({ email });
      if (!findUser) throw new Error("User doesn't exist");
      const isUserValid = await bcrypt.compare(password, findUser.password);
      if (!isUserValid) throw new Error("Incorrect password");
      await User.updateOne({ email }, { $set: { last_login: Date.now() } });
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  })
);
