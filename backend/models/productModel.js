import mongoose from "mongoose";
const reveiwSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  {
    timeStamps: true,
  }
);
const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      //We but ref because we need to specify (نخصص) where which collection this is coming from
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      rquired: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reveiwSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timeStamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

export default Product;
