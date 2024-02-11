import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exits"],
    required: [true, "Email is required"],
  },
  password: String,
  name: {
    first: {
      type: String,
      maxLength: 50,
    },
    last: {
      type: String,
      maxLength: 50,
    },
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  is_staff: {
    type: Boolean,
    default: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  last_login: { type: Date, default: null },
  date_joined: { type: Date, default: Date.now },
});

UserSchema.plugin(paginate);

const User = models.User || model("User", UserSchema);

export default User;
