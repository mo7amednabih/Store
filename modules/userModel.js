const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { captureRejectionSymbol } = require("nodemailer/lib/xoauth2");
//1-create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email required"],
      lowercase: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "too short password"],
    },
    passwordChangeAt: String,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
      type: String,
      default: "user",
      enum: ["user", "manager", "admin"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    // child reference (one to many) =>  لما يكون عدد ال شايلد قليل
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const setImageURL = (doc) => {
  if (doc.profileImg) {
    const imageUrl = `${process.env.BASE_URL}/users/${doc.profileImg}`;
    doc.profileImg = imageUrl;
  }
};
//findALL , findOne , update
userSchema.post("init", (doc) => {
  setImageURL(doc);
});

//create
userSchema.post("save", (doc) => {
  setImageURL(doc);
});

//2-create Model
module.exports = mongoose.model("User", userSchema);
