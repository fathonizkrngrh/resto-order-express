const Product = require("../../models/Product.model");
const Category = require("../../models/Category.model");
// utilities
const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiNotFoundResponse,
} = require("../../utils/api.response");
const { generateRandomUserId } = require("../../utils/randomGenerator.util");

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
          path: "productId",
          select: "_id name imageId price totalOrder isReady",
          sort: { isReady: 1 },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });

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
        .sort({ totalOrder: -1 })
        .populate({
          path: "imageId",
          select: "_id imageUrl",
        });

      if (!product || product.length === 0) {
        return res
          .status(status.NOT_FOUND)
          .json(apiNotFoundResponse("Product Not Found"));
      }

      const userId = generateRandomUserId(16)

      return res
        .status(status.OK)
        .json(
          apiResponse(status.OK, "OK", `Success get popular product`, {product, userId})
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
};
