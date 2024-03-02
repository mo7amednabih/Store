const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const slugify = require("slugify");
exports.getSubCategoriesValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.createSubCategoriesValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short Subcategory name")
    .isLength({ max: 32 })
    .withMessage("Too long Subcategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("SubCategory id required")
    .isMongoId()
    .withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];

exports.updateSubCategoriesValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteSubCategoriesValidator = [
  check("id").isMongoId().withMessage("Invalid Subcategory id format"),
  validatorMiddleware,
];
