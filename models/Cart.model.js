const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const Cart = new Schema({
  productId: { type: String, ref: "Cart" },
  qty: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cart", Cart);
