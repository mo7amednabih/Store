const express = require("express");
const {
  signup,
  login,
  forgetPassword,
  verifyPassResetCode,
  resetPassword,
} = require("../servers/authServer");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");

const router = express.Router();

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/forgetpass", forgetPassword);
router.post("/verifycode", verifyPassResetCode);
router.put("/resetpassword", resetPassword);
module.exports = router;
