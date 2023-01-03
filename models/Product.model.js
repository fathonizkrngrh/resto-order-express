const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: ObjectId,
    ref: "Category",
  },
  imageId: [{ type: ObjectId, ref: "Image" }],
  totalOrder: {
    type: Number,
    default: 0,
  },
  isReady: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
