import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  items: [
    {
      pid: { type: mongoose.Schema.ObjectId, ref: "Product" },
      qty: Number,
      size: String,
    },
  ],
});

const Cart = mongoose.models.carts || mongoose.model("carts", cartSchema);

export default Cart;
