const express = require("express");
const authServer = require("../servers/authServer");
const {
  createCoupon,
  getCoupons,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../servers/couponServer");

const router = express.Router();

router.use(authServer.protect, authServer.allowedTo("admin", "manager"));

router.route("/").post(createCoupon).get(getCoupons);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);
module.exports = router;
