const Product = require("../../models/Product.model");
const Image = require("../../models/Image.model");
const Category = require("../../models/Category.model");
// const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewProduct: async (req, res) => {
    try {
      //   const item = await Item.find()
      //     .populate({ path: "imageId", select: "id imageUrl" })
      //     .populate({ path: "categoryId", select: "id name" });
      //   const category = await Category.find();
      //   const image = await Image.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = "Resto Order | Product";
      res.render("admin/admin/food/viewMenu", {
        // item,
        // category,
        // image,
        alert,
        title,
        action: "view",
      });
    } catch (err) {
      res.redirect("/admin/item");
    }
  },
};
