import Collection from "../models/collectionSchema.js";

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

    // Check if the name is already exist in the database
    const existingCollection = await Collection.findOne({ name });

    // If exist send response
    if (existingCollection) {
      return res.status(200).json({
        success: false,
        message: "Collection already exists",
      });
    }
    // Else create new collection
    const collection = await Collection.create({ name });
    // Send success response
    res.status(200).json({
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
