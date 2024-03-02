const BrandModel = require("../modules/brandModel");
const factory = require("./handlersFactory");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../middleware/uploadImageMiddleware");

//Upload single image
exports.uploadBrandImage = uploadSingleImage("image");

//Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 900)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  // Save image into  our db
  req.body.image = filename;

  next();
});

exports.getBrands = factory.getAll(BrandModel);
exports.getBrand = factory.getOne(BrandModel);
exports.createBrand = factory.createOne(BrandModel);
exports.updateBrand = factory.updateOne(BrandModel);
exports.deleteBrand = factory.deleteOne(BrandModel);
