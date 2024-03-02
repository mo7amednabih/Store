const mongoose = require("mongoose");
//1-create Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "Too short Brand name"],
      maxlength: [32, "Too long Brand name"],
    },
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const setImageURL = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageUrl;
  }
};
//findALL , findOne , update
brandSchema.post("init", (doc) => {
  setImageURL(doc);
});

//create
brandSchema.post("save", (doc) => {
  setImageURL(doc);
});

//2-create Model
module.exports = mongoose.model("Brand", brandSchema);
