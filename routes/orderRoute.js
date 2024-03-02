const express = require("express");
const authServer = require("../servers/authServer");
const {
  createCashOrder,
  filterOrderForLoggedUser,
  findAllOrders,
  findSpecificOrder,
  updateOrderToDeliverd,
  updateOrderToPaid,
  checkoutSession,
} = require("../servers/orderService");

const router = express.Router();

router.use(authServer.protect);

router.get("/checkout/:cartId", authServer.allowedTo("user"), checkoutSession);

router.route("/:cartId").post(authServer.allowedTo("user"), createCashOrder);
router.get(
  "/",
  authServer.allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get("/:id", findSpecificOrder);

router.put(
  "/:id/pay",
  authServer.allowedTo("admin", "manager"),
  updateOrderToPaid
);
router.put(
  "/:id/deliver",
  authServer.allowedTo("admin", "manager"),
  updateOrderToDeliverd
);
module.exports = router;
