const express = require("express");
const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCatgory,
  setCategoryIdToBody,
  createFilterObj,
} = require("../servers/subCategoryServer");
const authServer = require("../servers/authServer");
const {
  createSubCategoriesValidator,
  getSubCategoriesValidator,
  updateSubCategoriesValidator,
  deleteSubCategoriesValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router({ mergeParams: true });
router
  .route("/")
  .post(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    setCategoryIdToBody,
    createSubCategoriesValidator,
    createSubCategory
  )
  .get(createFilterObj, getSubCategories);

router
  .route("/:id")
  .get(getSubCategoriesValidator, getSubCategory)
  .put(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    updateSubCategoriesValidator,
    updateSubCategory
  )
  .delete(
    authServer.protect,
    authServer.allowedTo("admin"),
    deleteSubCategoriesValidator,
    deleteSubCatgory
  );
module.exports = router;
