import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Collection name is required"],
      trim: true,
      unique: true,
      maxLength: [80, "Collection name cannot exceed 80 characters"],
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Collection", collectionSchema);
