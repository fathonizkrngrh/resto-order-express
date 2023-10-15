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
      const order = await Order.findOne({ _id: id });
      if (order.isPaid === true){
        req.flash("alertMessage", "Order already paid");
        req.flash("alertStatus", "danger");
        return res.redirect(`/admin/order`)
      } 
      order.isPaid = true

      const product = Product.findOne({ _id: order.productId });
      await order.save()    

      req.flash("alertMessage", "Success set product status");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/order`);
    } catch (err) {
      console.log(err);
      res.redirect(`/admin/order`);
    }
  },
};
