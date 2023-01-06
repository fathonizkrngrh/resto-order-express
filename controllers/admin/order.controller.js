const Product = require("../../models/Product.model");
const Order = require("../../models/Order.model");

module.exports = {
  viewOrder: async (req, res) => {
    try {
      const order = await Order.find().populate({
        path: "cartId",
        select: "productId qty notes",
        populate: {
          path: "productId",
          select: "name",
        },
      });

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = "Resto Order | Order";
      console.log(order);
      res.render("admin/order/viewOrder", {
        order,
        alert,
        title,
        action: "view",
      });
    } catch (err) {
      rs.render("error", {
        err,
      });
    }
  },
  changeStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ _id: id });
      if (product.isReady === true) {
        product.isReady = false;
      } else if (product.isReady === false) {
        product.isReady = true;
      }

      await product.save();

      req.flash("alertMessage", "Success set product status");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/product`);
    } catch (err) {
      console.log(err);
      res.redirect(`/admin/product`);
    }
  },
};
