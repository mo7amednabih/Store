const CategoryModel = require("../modules/categoryModel");
const factory = require("./handlersFactory");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");

//Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

//Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 900)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into  our db
    // if you need save url about photo in db => req.body.image = req.hostname+filename;
    req.body.image = filename;
  }

  next();
});

exports.getCategories = factory.getAll(CategoryModel);
exports.getCategory = factory.getOne(CategoryModel);
exports.createCategory = factory.createOne(CategoryModel);
exports.updateCategory = factory.updateOne(CategoryModel);
exports.deleteCatgory = factory.deleteOne(CategoryModel);
