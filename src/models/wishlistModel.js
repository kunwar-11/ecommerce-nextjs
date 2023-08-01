import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  items: [
    {
      _id: { type: mongoose.Schema.ObjectId, ref: "Product" },
    },
  ],
});

const Wishlist =
  mongoose.models.wishlists || mongoose.model("wishlists", wishlistSchema);

export default Wishlist;
