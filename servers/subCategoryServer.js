const SubCategory = require("../modules/subCategoryModel");
const factory = require("./handlersFactory");
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

exports.getSubCategories = factory.getAll(SubCategory);

exports.getSubCategory = factory.getOne(SubCategory);
exports.createSubCategory = factory.createOne(SubCategory);
exports.updateSubCategory = factory.updateOne(SubCategory);
exports.deleteSubCatgory = factory.deleteOne(SubCategory);
