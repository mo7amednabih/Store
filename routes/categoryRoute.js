const express = require("express");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCatgory,
  uploadCategoryImage,
  resizeImage,
} = require("../servers/categoryServer");

const {
  getCategoriesValidator,
  createCategoriesValidator,
  updateCategoriesValidator,
  deleteCategoriesValidator,
} = require("../utils/validators/categoryValidator");

const authServer = require("../servers/authServer");
const subCategoryRoute = require("./subCategoryRoute");
const router = express.Router();
router.use("/:categoryId/subcategories", subCategoryRoute);

router
  .route("/")
  .post(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoriesValidator,
    createCategory
  )
  .get(getCategories);
router
  .route("/:id")
  .get(getCategoriesValidator, getCategory)
  .put(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    updateCategoriesValidator,
    updateCategory
  )
  .delete(
    authServer.protect,
    authServer.allowedTo("admin"),
    deleteCategoriesValidator,
    deleteCatgory
  );
module.exports = router;
