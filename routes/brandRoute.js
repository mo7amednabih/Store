const express = require("express");
const authServer = require("../servers/authServer");
const {
  createBrand,
  getBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../servers/brandSever");

const {
  getBrandValidator,
  createBrandsValidator,
  updateBrandsValidator,
  deleteBrandsValidator,
} = require("../utils/validators/brandValidator");

const router = express.Router();

router
  .route("/")
  .post(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createBrandsValidator,
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .put(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImage,
    updateBrandsValidator,
    updateBrand
  )
  .delete(
    authServer.protect,
    authServer.allowedTo("admin"),
    deleteBrandsValidator,
    deleteBrand
  );
module.exports = router;
