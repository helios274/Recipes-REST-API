import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const { Schema, model, models } = mongoose;

const tagSchema = new Schema({
  name: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    maxLength: 50,
    required: true,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

tagSchema.index({ slug: 1 });
tagSchema.plugin(paginate);

const Tag = models.Tag || model("Tag", tagSchema);

export default Tag;
