const ReviewModel = require("../modules/reviewModel");
const factory = require("./handlersFactory");

const asyncHandler = require("express-async-handler");

//Nested route
// Get /products/sdjsdjshdsjsd/reviews
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObj = filterObject;
  next();
};
exports.getReviews = factory.getAll(ReviewModel);
exports.getReview = factory.getOne(ReviewModel);

//Nested route
// Post /products/sdjsdjshdsjsd/reviews
exports.setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};
exports.createReview = factory.createOne(ReviewModel);
exports.updateReview = factory.updateOne(ReviewModel);
exports.deleteReview = factory.deleteOne(ReviewModel);
