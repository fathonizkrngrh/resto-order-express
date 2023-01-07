const Product = require("../../models/Product.model");
const Image = require("../../models/Image.model");
const Category = require("../../models/Category.model");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  viewProduct: async (req, res) => {
    try {
      const product = await Product.find()
        .populate({ path: "imageId", select: "id imageUrl" })
        .populate({ path: "categoryId", select: "id name" });
      const category = await Category.find();
      const image = await Image.find();

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
  showImageProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id }).populate({
        path: "imageId",
        select: "id imageUrl",
      });

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = "RestoOrder | Show Image product";
      res.render("admin/food/viewMenu", {
        product,
        alert,
        title,
        action: "show image",
      });
    } catch (err) {
      res.redirect("/admin/RestoOrder");
    }
  },
  addProduct: async (req, res) => {
    try {
      const { name, price, categoryId } = req.body;
      console.log(req.files);
      if (req.files.length > 0) {
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

  showEditProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id })
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({ path: "categoryId", select: "id name" });
      const category = await Category.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = "RestoOrder | Edit Product";
      res.render("admin/food/viewMenu", {
        product,
        alert,
        category,
        title,
        action: "edit",
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/RestoOrder");
    }
  },
  editProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, price, categoryId } = req.body;
      const product = await Product.findOne({ _id: id })
        .populate({
          path: "imageId",
          select: "id imageUrl",
        })
        .populate({ path: "categoryId", select: "id name" });

      if (categoryId !== product.categoryId) {
        const category = await Category.findOne({ _id: product.categoryId });
        console.log("sebelum dihapus ", category.productId);
        await Category.updateOne(
          { _id: product.categoryId },
          { $pull: { productId: id } }
        );
        console.log("setelah dihapus", category.productId);

        const newCategory = await Category.findOne({ _id: categoryId });
        console.log("sebelum ditambah ", newCategory.productId);
        newCategory.productId.push({ _id: product._id });
        await newCategory.save();
        console.log("setelah ditambah", newCategory.productId);
      }

      if (req.files.length == product.imageId.length) {
        for (let i = 0; i < product.imageId.length; i++) {
          let imageUpdate = await Image.findOne({
            _id: product.imageId[i]._id,
          });
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          imageUpdate.imageUrl = `images/${req.files[i].filename}`;
          await imageUpdate.save();
        }
        product.name = name;
        product.price = price;
        product.categoryId = categoryId;
        await product.save();

        req.flash("alertMessage", "success update product");
        req.flash("alertStatus", "success");
      } else if (
        req.files.length != product.imageId.length &&
        req.files.length > 0
      ) {
        for (let i = 0; i < product.imageId.length; i++) {
          let imageUpdate = await Image.findOne({
            _id: product.imageId[i]._id,
          });
          await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));
          product.imageId[i] = undefined;
          await imageUpdate.save();
        }

        for (let j = 0; j < req.files.length; j++) {
          const imageSave = await Image.create({
            imageUrl: `images/${req.files[j].filename}`,
          });
          product.imageId.push({ _id: imageSave._id });
          await product.save();
        }
        product.name = name;
        product.price = price;
        product.categoryId = categoryId;
        await product.save();

        req.flash("alertMessage", "success update product");
        req.flash("alertStatus", "success");
      } else {
        product.name = name;
        product.price = price;
        product.categoryId = categoryId;
        await product.save();

        req.flash("alertMessage", "success update product");
        req.flash("alertStatus", "success");
      }
      res.redirect("/admin/product");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/product");
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
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findOne({ _id: id }).populate("imageId");

      const category = await Category.findOne({ _id: product.categoryId });
      console.log("sebelum dihapus ", category.productId);
      await Category.updateOne(
        { _id: product.categoryId },
        { $pull: { productId: id } }
      );
      console.log("setelah dihapus", category.productId);
      for (let i = 0; i < product.imageId.length; i++) {
        Image.findOne({ _id: product.imageId[i]._id })
          .then(async (image) => {
            await fs.unlink(path.join(`public/${image.imageUrl}`));
            image.remove();
          })
          .catch((error) => {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            return res.redirect("/admin/product");
          });
      }
      await product.remove();
      req.flash("alertMessage", "success delete product");
      req.flash("alertStatus", "success");
      res.redirect("/admin/product");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/product");
    }
  },
};
