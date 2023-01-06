const Product = require("../../models/Product.model");
const Category = require("../../models/Category.model");
const Cart = require("../../models/Cart.model");
const Order = require("../../models/Order.model");
const { createInvoice, sumTotalBeforeTax } = require("../../utils/order.utils");
// utilities
const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiNotFoundResponse,
  apiBadRequestResponse,
} = require("../../utils/api.response");

module.exports = {
  // ----- Category -----//
  getAllCategory: async (req, res) => {
    try {
      const category = await Category.find();
      if (!category || category.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Product Not Found"));
      }
      return res
        .status(status.OK)
        .json(
          apiResponse(status.OK, "OK", `Success get all category`, category)
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

  // ----- Product -----//

  getProductByCategory: async (req, res) => {
    try {
      const category = await Category.find({})
        .limit()
        .populate({
          // populate product from ProductId
          path: "productId",
          select: "_id name imageId price totalOrder isReady",
          sort: { isReady: 1 },
          perDocumentLimit: 10,
          populate: {
            // populate image url from imageId
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });

      if (!category || category.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Category Not Found"));
      }

      return res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", `Success get category`, category));
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
  getDetailProductById: async (req, res) => {
    try {
      const { id } = req.params;

      const product = await Product.findOne({ _id: id }).populate({
        path: "imageId",
        select: "_id imageUrl",
      });
      if (!product || product.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Product Not Found"));
      }

      return res
        .status(status.OK)
        .json(apiResponse(status.OK, "OK", `Success get product`, product));
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
  getProductPopular: async (req, res) => {
    try {
      const product = await Product.find()
        .limit(4)
        .sort({ totalOrder: 1 })
        .populate({
          path: "imageId",
          select: "_id imageUrl",
        });

      if (!product || product.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Product Not Found"));
      }

      return res
        .status(status.OK)
        .json(
          apiResponse(status.OK, "OK", `Success get popular product`, product)
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

  // ----------- Cart ----------- //
  addToCart: async (req, res) => {
    try {
      const { qty, notes } = req.body;
      const { id } = req.params;

      const product = await Product.findOne({ _id: id });

      const isExist = await Cart.findOne({ productId: id });
      if (isExist) {
        isExist.qty = isExist.qty + Number(qty);
        if (isExist.notes) {
          isExist.notes = isExist.notes + ` | ${notes}`;
        } else {
          isExist.notes = notes;
        }

        isExist.subtotal = isExist.subtotal + product.price * Number(qty);

        await isExist.save();
        return res
          .status(status.OK)
          .json(
            apiResponse(
              status.OK,
              "OK",
              `Success update product to cart`,
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
      const cart = await Cart.find({ isOrdered: false }).populate({
        path: "productId",
        select: "_id name price",
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

  // ----------- Order ----------- //

  sendOrder: async (req, res) => {
    try {
      const { tableNumber, username } = req.body;

      const cart = await Cart.find({
        isOrdered: false,
      }).populate({
        path: "productId",
        select: "_id name price",
      });
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

      console.log({
        total,
        tax,
      });

      const payload = {
        invoice,
        cartId,
        total,
        tax,
        tableNumber,
        username,
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
