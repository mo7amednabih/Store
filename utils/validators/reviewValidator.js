const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

const Review = require("../../modules/reviewModel");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid review id format"),
  validatorMiddleware,
];

exports.createReviewsValidator = [
  check("name").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5"),
  check("user").isMongoId().withMessage("Invalid Review id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      // check if logged user create review before
      Review.findOne({ user: req.user._id, product: req.body.product }).then(
        (review) => {
          if (review) {
            return Promise.reject(
              new Error("You already have created a review before")
            );
          }
        }
      )
    ),
  validatorMiddleware,
];

exports.updateReviewsValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid brand id format")
    .custom((val, { req }) =>
      // check review ownership before update
      Review.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }
        if (review.user._id.toString() != req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
  validatorMiddleware,
];

exports.deleteReviewsValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid brand id format")
    .custom((val, { req }) => {
      if (req.user.role == "user") {
        return Review.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }
          if (review.user._id.toString() != req.user._id.toString()) {
            return Promise.reject(
              new Error(`Your are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
