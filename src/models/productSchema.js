import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: String,
      required: true,
    },
    collection: {
      type: mongoose.ObjectId,
      ref: "Collection",
      require: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
      required: true,
      default:false
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
