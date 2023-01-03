const Product = require("../../models/Product.model");
const Image = require("../../models/Image.model");
const Category = require("../../models/Category.model");
// const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewProduct: async (req, res) => {
    try {
      const product = await Product.find()
        .populate({ path: "imageId", select: "id imageUrl" })
        .populate({ path: "categoryId", select: "id name" });
      const category = await Category.find();
      //   const image = await Image.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = "Resto Order | Product";
      res.render("admin/food/viewMenu", {
        product,
        category,
        // image,
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
  addProduct: async (req, res) => {
    try {
      const { name, price, categoryId } = req.body;
      console.log(req);
      console.log(req.file);
      console.log(req.files);
      if (req.file.length > 0) {
        const category = await Category.findOne({ _id: categoryId });

        const newProduct = {
          name,
          price,
          categoryId: category._id,
        };
        const product = await Product.create(newProduct);
        category.productId.push({ _id: product._id });
        await category.save();
        console.log(req.files);
        for (let i = 0; i < req.files.length; i++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[i].filename}`,
          });
          product.imageId.push({ _id: imageSave._id });
          await product.save();
        }

        req.flash("alertMessage", "Success add product");
        req.flash("alertStatus", "success");
      }

      res.redirect("/admin/product");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/product");
    }
  },
};
