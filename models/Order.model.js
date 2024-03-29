const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema({
  invoice: {
    type: String,
    required: true,
  },
  cartId: [
    {
      type: ObjectId,
      ref: "Cart",
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Order", orderSchema);
