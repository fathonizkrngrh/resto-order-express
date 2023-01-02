const Category = require("../models/Category.model");

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
      const title = "Staycation | Category";
      return res.render("admin/category/viewCategory", {
        category,
        alert,
        title,
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
};
