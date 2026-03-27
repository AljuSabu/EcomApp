import Collection from "../models/collectionSchema.js";
import slugify from "slugify";

// Create Collection
export const createCollection = async (req, res) => {
  try {
    // Get info from frontend
    const { name } = req.body;

    // Validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a collection name",
      });
    }

    // Slugify name
    const slug = slugify(name, { lower: true });

    // Check if the name is already exist in the database
    const existingCollection = await Collection.findOne({ slug });

    // If exist send response
    if (existingCollection) {
      return res.status(200).json({
        success: false,
        message: "Collection already exists",
      });
    }
    // Else create new collection
    const collection = await Collection.create({ name, slug });
    // Send success response
    res.status(201).json({
      status: true,
      message: "New collection has been created successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in create collection ${error}`,
      error,
    });
  }
};

// Get all Collection
export const getAllCollection = async (req, res) => {
  try {
    const collection = await Collection.find();
    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Successfully fetched all collections",
      count: collection.length,
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in getting all collection`,
      error,
    });
  }
};

// Delete Collection
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collectionToDelete = await Collection.findByIdAndDelete(id);

    if (!collectionToDelete) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Collection has been successfully deleted",
      collectionToDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in delete collection",
      error,
    });
  }
};

// Get Single Collection
export const singleColletion = async (req, res) => {
  try {
    const singleColletion = await Collection.findOne({ id: req.params._id });
    res.status(200).json({
      success: true,
      message: "Successfully fetched single collection",
      singleColletion,
    });
  } catch (error) {
    console.log(error);
    res.status(500)({
      success: false,
      message: "Error in getting single collection",
      error,
    });
  }
};

// Update Collection
export const UpdateCollection = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const collection = await Collection.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true },
    );
    res.status(200).json({
      success: true,
      message: "Collection name has been updated successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: `Error in Updating the Collection ${error}`,
      error,
    });
  }
};
