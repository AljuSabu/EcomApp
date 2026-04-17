import Product from "../models/productSchema.js";
import fs, { readdirSync } from "fs";
import slugify from "slugify";

// Create Product
export const createProduct = async (req, res) => {
  try {
    // Get info from frontend. As we have installed formidable we will grap the data from req.fields instead of req.body
    const { name, description, price, collection, quantity, shipping } =
      req.fields;

    // Get photo from req.files
    const { photo } = req.files;

    // Validation
    if (!name || !description || !price || !collection || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Photo Validation
    if (!photo && photo.size > 1000000) {
      return res.status(400).json({
        success: false,
        message: "Photo is required and it cannot be more than 1mb",
      });
    }

    // Check if the product already exists in the database
    const existingProduct = await Product.findOne({ name });

    // If exists sent response
    if (existingProduct) {
      return res.status(200).json({
        success: false,
        message: "Product already exists",
      });
    }

    // If not exists create new product
    const product = new Product({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save the product
    await product.save();

    // Send success message
    res.status(201).json({
      success: true,
      message: "New product has been created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating product",
      error,
    });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("collection")
      .select("-photo")
      .limit(15)
      .sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Products",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching products",
      error,
    });
  }
};

// Get Single Product
export const singleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("collection")
      .select("-photo");
    res.status(200).json({
      succcess: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      meaasage: "Error in fetching single product",
      error,
    });
  }
};

// Get Photo
export const productPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in fetching photo",
    });
  }
};
