const CouponModel = require("../modules/couponModel");
const factory = require("./handlersFactory");

exports.getCoupons = factory.getAll(CouponModel);
exports.getCoupon = factory.getOne(CouponModel);
exports.createCoupon = factory.createOne(CouponModel);
exports.updateCoupon = factory.updateOne(CouponModel);
exports.deleteCoupon = factory.deleteOne(CouponModel);
