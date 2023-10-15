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
const { getUserAgent } = require("../../utils/useragent.utils");

module.exports = {
  // ----------- Order ----------- //
  sendOrder: async (req, res) => {
    try {
      const { tableNumber, username, useragent } = req.body;

      if (tableNumber === undefined || username === undefined) {
        return res
          .status(status.BAD_REQUEST)
          .json(apiBadRequestResponse("Enter your name and table number"));
      }

      const cart = await Cart.find({
        isOrdered: false,
        useragent: useragent ,
      }).populate({
        path: "productId",
        select: "_id name price",
      });
      if (!cart) {
        return res
          .status(status.BAD_REQUEST)
          .json(apiBadRequestResponse("Empty cart"));
      }

      const product = await Product.find();

      const invoice = createInvoice(username, tableNumber);

      let cartId = [];
      for (let i = 0; i < cart.length; i++) {
        cartId.push(cart[i]._id);
        cart[i].isOrdered = true;
        cart[i].save();
        for (let j = 0; j < product.length; j++) {
          if (cart[i].productId == product[j]._id) {
            console.log(product[j].totalOrder, cart[i].qty);
            product[j].totalOrder += Number(cart[i].qty);
            product.save();
          }
        }
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
        useragent
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
};
