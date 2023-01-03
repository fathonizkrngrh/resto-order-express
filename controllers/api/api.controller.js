const Product = require("../../models/Product.model");
const Category = require("../../models/Category.model");
const Order = require("../../models/Order.model");
// utilities
const { StatusCodes: status } = require("http-status-codes");
const {
  apiResponse,
  apiNotFoundResponse,
  apiBadRequestResponse,
} = require("../../utils/api.response");

module.exports = {
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

      if (!category) {
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
      if (!product) {
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

      if (!product) {
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
  searchProduct: async (req, res) => {
    try {
      const { search } = req.body;
      const product = await Product.find({ name: { $regex: '"hp probook"' } });
    } catch (error) {}
  },
  sendOrder: async (req, res) => {
    try {
      const { search } = req.body;
      const product = await Product.find({ name: { $regex: '"hp probook"' } });
    } catch (error) {}
  },
};
