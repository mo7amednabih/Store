const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../servers/productServer");
const authServer = require("../servers/authServer");

const {
  getProductsValidator,
  createProductsValidator,
  updateProductsValidator,
  deleteProductsValidator,
} = require("../utils/validators/productValidator");
const router = express.Router();

const reviewsRoute = require("./reviewRoute");

// Post /products/sdjsdjshdsjsd/reviews
// Get /products/sdjsdjshdsjsd/reviews
// Get /products/sdjsdjshdsjsd/reviews/sdhjsdhjshdj
router.use("/:productId/reviews", reviewsRoute);

router
  .route("/")
  .post(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductsValidator,
    createProduct
  )
  .get(getProducts);
router
  .route("/:id")
  .get(getProductsValidator, getProduct)
  .put(
    authServer.protect,
    authServer.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductsValidator,
    updateProduct
  )
  .delete(
    authServer.protect,
    authServer.allowedTo("admin"),
    deleteProductsValidator,
    deleteProduct
  );
module.exports = router;
