const ProductModel = require("../modules/productModel");
const factory = require("./handlersFactory");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { uploadMixOfImages } = require("../middleware/uploadImageMiddleware");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // 1)Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into  our db
    // if you need save url about photo in db => req.body.image = req.hostname+imageCoverFileName;
    req.body.imageCover = imageCoverFileName;
  }
  // 2)Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into  our db
        // if you need save url about photo in db => req.body.image = req.hostname+imageName;
        req.body.images.push(imageName);
      })
    );
  }
  next();
});

exports.getProducts = factory.getAll(ProductModel, "productModel");
exports.getProduct = factory.getOne(ProductModel, "reviews");
exports.createProduct = factory.createOne(ProductModel);
exports.updateProduct = factory.updateOne(ProductModel);
exports.deleteProduct = factory.deleteOne(ProductModel);
