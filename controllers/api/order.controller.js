const Product = require("../../models/Product.model");
const Cart = require("../../models/Cart.model");
const Order = require("../../models/Order.model");
const { createInvoice, sumTotalBeforeTax } = require("../../utils/order.utils");
// utilities
const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiBadRequestResponse,
} = require("../../utils/api.response");

module.exports = {
  // ----------- Order ----------- //
  sendOrder: async (req, res) => {
    try {
      const { tableNumber, username, userId } = req.body;

      if (tableNumber === undefined || username === undefined) {
        return res
          .status(status.BAD_REQUEST)
          .json(apiBadRequestResponse("Enter your name and table number"));
      }

      const cart = await Cart.find({
        isOrdered: false,
        userId: userId ,
      }).populate({
        path: "productId",
        select: "_id name price",
      });
      if (!cart) {
        return res
          .status(status.BAD_REQUEST)
          .json(apiBadRequestResponse("Empty cart"));
      }

      const invoice = createInvoice(username, tableNumber);

      let cartId = [];
      for (let i = 0; i < cart.length; i++) {
        cartId.push(cart[i]._id);
        cart[i].isOrdered = true;
        cart[i].save();
        const product = await Product.findOne({_id: cart[i].productId })
        product.totalOrder += Number(cart[i].qty);
        await product.save();
      }

      const totalBeforeTax = sumTotalBeforeTax(cart);
      const tax = Number(totalBeforeTax) * 0.1;
      const total = Number(totalBeforeTax) + tax;

      const payload = {
        invoice,
        cartId,
        total,
        tax,
        tableNumber,
        username,
        userId
      };

      const order = await Order.create(payload);

      return res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", `Success  order product`, order));
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(
          apiResponse(
            status.INTERNAL_SERVER_ERROR,
            "INTERNAL_SERVER_ERROR",
            error.message
          )
        );
    }
  },

  getOrder: async (req, res) => {
    try {
      const { userId} = req.body

      const order = await Order.find({
        userId: userId ,
      }).populate({
        path: "cartId",
        select: "_id productId qty subtotal notes isOrdered",
        populate: {
          path: "productId",
          select: "_id name",
        },
      });

      return res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", `Success  get ordered product`, order));
    } catch (error) {
      return res
        .status(status.INTERNAL_SERVER_ERROR)
        .json(
          apiResponse(
            status.INTERNAL_SERVER_ERROR,
            "INTERNAL_SERVER_ERROR",
            error.message
          )
        );
    }
  }
};
