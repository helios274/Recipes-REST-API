import mongoose from "mongoose";
import slugify from "slugify";
import ShortUniqueId from "short-unique-id";
import paginate from "mongoose-paginate-v2";

const { Schema, model, models } = mongoose;
const { randomUUID } = new ShortUniqueId({ length: 7 });

const recipeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 150,
    },
    slug: {
      type: String,
      unique: true,
    },
    description: String,
    method: [
      {
        name: String,
        ingredients: [String],
        steps: [String],
      },
    ],
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

recipeSchema.index({ slug: 1 });
recipeSchema.plugin(paginate);

recipeSchema.pre("save", async function (next) {
  let slug = slugify(this.title, { lower: true });
  const existingSlug = await Recipe.findOne({ slug });
  if (existingSlug) slug = slug + "-" + randomUUID();
  this.slug = slug;
  next();
});

recipeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.title) {
    let slug = slugify(update.title, { lower: true });
    const existingSlug = await Recipe.findOne({ slug });
    if (existingSlug) slug = slug + "-" + randomUUID();
    update.slug = slug;
  }
  next();
});

const Recipe = models.Recipe || model("Recipe", recipeSchema);

export default Recipe;
