const express = require("express");
const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../servers/wishlistServer");
const authServer = require("../servers/authServer");

const router = express.Router();
router.use(authServer.protect, authServer.allowedTo("user"));
router.route("/").post(addProductToWishlist).get(getLoggedUserWishlist);

router.route("/:productId").delete(removeProductFromWishlist);
module.exports = router;
