const express = require("express");
const {
  addAddresses,
  removeAddress,
  getLoggedUserAddresses,
} = require("../servers/addressesServer");
const authServer = require("../servers/authServer");

const router = express.Router();
router.use(authServer.protect, authServer.allowedTo("user"));
router.route("/").post(addAddresses).get(getLoggedUserAddresses);

router.route("/:addressId").delete(removeAddress);
module.exports = router;
