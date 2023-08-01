import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide an firstName"],
  },
  image: {
    type: String,
    required: [true, "image Url is Required"],
  },
  description: {
    type: String,
    required: [true, "description is Required"],
  },
});

const Category =
  mongoose.models.categories || mongoose.model("categories", categorySchema);

export default Category;
