import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide product name"],
  },
  price: {
    type: Number,
    required: [true, "please provide price"],
  },
  image: {
    type: String,
    required: [true, "image Url is Required"],
  },
  category: {
    type: String,
    required: [true, "Category is Required"],
  },
  size: [
    {
      type: String,
    },
  ],
  ratings: Number,
  description: String,
  inStock: Boolean,
});

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);

export default Product;
