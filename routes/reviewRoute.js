const express = require("express");
const authServer = require("../servers/authServer");
const {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} = require("../servers/reviewServer");

const {
  getReviewValidator,
  createReviewsValidator,
  updateReviewsValidator,
  deleteReviewsValidator,
} = require("../utils/validators/reviewValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    authServer.protect,
    authServer.allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewsValidator,
    createReview
  )
  .get(createFilterObj, getReviews);
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(
    authServer.protect,
    authServer.allowedTo("user"),
    updateReviewsValidator,
    updateReview
  )
  .delete(
    authServer.protect,
    authServer.allowedTo("admin", "manager", "user"),
    deleteReviewsValidator,
    deleteReview
  );
module.exports = router;
