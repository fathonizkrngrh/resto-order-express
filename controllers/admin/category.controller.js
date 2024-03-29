const Category = require("../../models/Category.model");
const Product = require("../../models/Product.model");

module.exports = {
  viewCategory: async (req, res) => {
    try {
      const category = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const title = "RestoOrder | Category";
      return res.render("admin/category/viewCategory", {
        category,
        alert,
        title,
      });
    } catch (err) {
      return res.redirect("/admin/category");
    }
  },
  viewCategoryById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      res.status(202).json({
        status: "oke",
        message: "berhasil",
        data: category,
      });
    } catch (err) {
      return res.redirect("/admin/category");
    }
  },
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;
      await Category.create({ name });

      req.flash("alertMessage", "success add category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  editCategory: async (req, res) => {
    try {
      const { id, name } = req.body;
      const findCategory = await Category.findOne({ _id: id });

      findCategory.name = name;

      await findCategory.save();

      req.flash("alertMessage", "success edit category");
      req.flash("alertStatus", "success");
      //   res.redirect("/admin/category");
      return res.redirect("/admin/category");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });

      await Product.deleteMany({ _id: category.productId });
      await category.remove();

      req.flash("alertMessage", "success delete category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
};
