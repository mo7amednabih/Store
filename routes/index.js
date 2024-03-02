const categoryRoute = require("./categoryRoute");
const SubCategoryRoute = require("./subCategoryRoute");
const BrandRoute = require("./brandRoute");
const ProductRoute = require("./productRoute");
const UserRoute = require("./userRoute");
const AuthRoute = require("./authRoute");
const reviewRoute = require("./reviewRoute");
const wishlistRoute = require("./wishlistRoute");
const addressRoute = require("./addressRoute");
const couponRoute = require("./couponRoute");
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");

const mountRoutes = (app) => {
  app.use("/category", categoryRoute);
  app.use("/Subcategory", SubCategoryRoute);
  app.use("/brand", BrandRoute);
  app.use("/product", ProductRoute);
  app.use("/user", UserRoute);
  app.use("/auth", AuthRoute);
  app.use("/review", reviewRoute);
  app.use("/wishlist", wishlistRoute);
  app.use("/address", addressRoute);
  app.use("/coupon", couponRoute);
  app.use("/cart", cartRoute);
  app.use("/order", orderRoute);
};

module.exports = mountRoutes;
