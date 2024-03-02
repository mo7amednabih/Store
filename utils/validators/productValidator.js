const { check } = require("express-validator");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const Category = require("../../modules/categoryModel");
const SubCategory = require("../../modules/subCategoryModel");
const slugify = require("slugify");
exports.createProductsValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3 })
    .withMessage("Too short product title")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ max: 2000 })
    .withMessage("Too long product description"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity is required")
    .isNumeric()
    .withMessage("product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("product sold must be a number"),
  check("price")
    .notEmpty()
    .withMessage("roduct price is required")
    .isNumeric()
    .withMessage("product price must be a number")
    .isLength({ max: 32 })
    .withMessage("Too long product price"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("product priceAfterDiscount must be a number")
    .isFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error("priceAfterDiscount must be lower than product price");
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors should be an array of string"),
  check("imageCover").notEmpty().withMessage("product imageCover is required"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be an array of string"),
  check("category")
    .notEmpty()
    .withMessage("product must be belong to category")
    .isMongoId()
    .withMessage("Invalid Id format")
    .custom((categoryId) =>
      Category.findById(categoryId).then((category) => {
        if (!category) {
          return Promise.reject(
            new Error(`No category for this id: ${categoryId}`)
          );
        }
      })
    ),
  check("subCategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid Id format")
    .custom((SubCategoriesId) =>
      SubCategory.find({
        _id: { $exists: true, $in: SubCategoriesId },
      }).then((results) => {
        if (results.length < 1 || results.length != SubCategoriesId.length) {
          return Promise.reject(new Error(`Invalid SubCategoriesId`));
        }
      })
    )
    .custom((val, { req }) =>
      SubCategory.find({ category: req.body.category }).then(
        (subcategories) => {
          const subCategoriesIdsInDB = [];
          subcategories.forEach((subCategory) => {
            subCategoriesIdsInDB.push(subCategory._id.toString());
          });
          //check if subCategories ids in db include subcategories in req.body (true/false)
          const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!checker(val, subCategoriesIdsInDB)) {
            return Promise.reject(
              new Error(`subcategories not belong to category`)
            );
          }
        }
      )
    ),
  check("brand").optional().isMongoId().withMessage("Invalid Id format"),
  check("ratingsAverage")
    .optional()
    .isNumeric()
    .withMessage("ratingAverage must be a number")
    .isLength({ min: 1 })
    .withMessage("Rating must be above or equal to 1.0 ")
    .isLength({ max: 5 })
    .withMessage("Rating must be below or equal to 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("ratingQuantity must be a number"),
  validatorMiddleware,
];

exports.updateProductsValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  check("title")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteProductsValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];

exports.getProductsValidator = [
  check("id").isMongoId().withMessage("Invalid product id format"),
  validatorMiddleware,
];
