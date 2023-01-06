const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const Cart = new Schema({
  productId: { type: ObjectId, ref: "Product" },
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
    required: false,
  },
  isOrdered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Cart", Cart);
