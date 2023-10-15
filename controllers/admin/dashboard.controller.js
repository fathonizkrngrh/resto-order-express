const Product = require("../../models/Product.model");
const Category = require("../../models/Category.model");
const Order = require("../../models/Order.model");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const products = await Product.find();
      const category = await Category.find();
      const order = await Order.find();
      
      res.render("index", {
        total: {
          product: products.length,
          category: category.length,
          order: order.length,
        },
        title: "RestoOrder | Dashboard",
      });
    } catch (err) {
      res.render("error", {
        err,
      });
    }
  },
};
