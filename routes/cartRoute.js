const express = require("express");
const authServer = require("../servers/authServer");
const {
  addProductToCart,
  getLoggedUserCart,
  removeSpecificCartItems,
  clearCart,
  updateCartItemQuantity,
  applyCoupon,
} = require("../servers/cartServer");

const router = express.Router();

router.use(authServer.protect, authServer.allowedTo("user"));

router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.put("/applyCoupon", applyCoupon);
router
  .route("/:itemId")
  .delete(removeSpecificCartItems)
  .put(updateCartItemQuantity);
//.get(getCoupon);
module.exports = router;
