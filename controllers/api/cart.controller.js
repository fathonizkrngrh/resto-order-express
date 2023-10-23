const Product = require("../../models/Product.model");
const Cart = require("../../models/Cart.model");
// utilities
const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiNotFoundResponse,
} = require("../../utils/api.response");

module.exports = {
  // ----------- Cart ----------- //
  addToCart: async (req, res) => {
    try {
      const { qty, notes, userId } = req.body;
      const { id } = req.params;

      const product = await Product.findOne({ _id: id });

      const isExist = await Cart.findOne({ productId: id });
      if (isExist && isExist.isOrdered === false) {
        isExist.qty = isExist.qty + Number(qty);
        if (isExist.notes) {
          isExist.notes = isExist.notes + ` | ${notes}`;
        } else {
          isExist.notes = notes;
        }

        isExist.subtotal = isExist.subtotal + product.price * Number(qty);
        isExist.userId = userId

        console.log(isExist)

        await isExist.save();
        return res
          .status(status.OK)
          .json(
            apiResponse(
              status.OK,
              "OK",
              `Success add product to cart`,
              isExist
            )
          );
      } else {
        const totalPrice = product.price * qty;
        cartProduct = {
          productId: id,
          qty,
          subtotal: totalPrice,
          notes: notes || "",
          isOrdered: false,
          userId: userId
        };
        const cart = await Cart.create(cartProduct);
        return res
          .status(status.OK)
          .json(
            apiResponse(status.OK, "OK", `Success add product to cart`, cart)
          );
      }
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
  getCartProduct: async (req, res) => {
    try {
        const { userId} = req.body
      const cart = await Cart.find({ isOrdered: false, userId: userId }).populate({
        path: "productId",
        select: "_id name imageId price ",
        populate: {
          path: "imageId",
          select: "_id imageUrl",
          perDocumentLimit: 1,
        },
      });
      return res
        .status(status.OK)
        .json(
          apiResponse(status.OK, "OK", `Success get all product in cart`, cart)
        );
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
  deleteProductCart: async (req, res) => {
    try {
      const { id } = req.params;
      const cart = await Cart.findOne({ _id: id });
      if (!cart) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Cart not found"));
      }
      await cart.remove();
      return res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", `Success delete product in cart`));
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
  deleteAllProductCart: async (req, res) => {
    try {
      const cart = await Cart.find();
      if (!cart || cart.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Cart already empty"));
      }
      await cart.remove({});
      return res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", `Success delete product in cart`));
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
