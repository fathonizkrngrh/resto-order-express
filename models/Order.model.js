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
  memberName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Unpaid",
  },
});

module.exports = mongoose.model("Order", orderSchema);
