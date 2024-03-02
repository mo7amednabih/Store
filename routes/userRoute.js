const express = require("express");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  resizeImage,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../servers/userServer");
const authServer = require("../servers/authServer");
const {
  getUserValidator,
  createUsersValidator,
  updateUsersValidator,
  deleteUsersValidator,
  changePasswordUsersValidator,
  updateLoggedUserDataValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();

router
  .route("/changepassword/:id")
  .put(changePasswordUsersValidator, changeUserPassword);
router.use(authServer.protect);
router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);
router.put("/updateMe", updateLoggedUserDataValidator, updateLoggedUserData);
router.delete("/deleteMe", deleteLoggedUserData);

//Admin for all next routes
router.use(authServer.allowedTo("admin", "manager"));

router
  .route("/")
  .post(uploadUserImage, resizeImage, createUsersValidator, createUser)
  .get(getUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadUserImage, resizeImage, updateUsersValidator, updateUser)
  .delete(deleteUsersValidator, deleteUser);
module.exports = router;
