const Product = require("../../models/Product.model");
const Category = require("../../models/Category.model");
const Order = require("../../models/Order.model");

module.exports = {
  viewDashboard: async (req, res) => {
    try {
      const products = await Product.find();
      const category = await Category.find();
      const order = await Order.find();

      console.log(products.length, category.length, order.length);

      res.render("index", {
        products,
        category,
        order,
        title: "RestoOrder | Dashboard",
      });
    } catch (err) {
      res.render("error", {
        err,
      });
    }
  },
};
