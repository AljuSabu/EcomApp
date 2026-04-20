import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  productPhoto,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// createProduct | method: post | path "/api/v1/product/create-product"
router.post("/create-product", formidable(), isLoggedIn, isAdmin, createProduct);

// getAllProducts | methot: get | path:"/api/v1/product/get-all-products"
router.get("/get-all-products", getAllProducts);

// singleProduct | methot: get | path:"/api/v1/product/single-product/:slug"
router.get("/single-product/:slug", singleProduct);

// productPhoto | methot: get | path:"/api/v1/product/product-photo/:pid"
router.get("/product-photo/:pid", productPhoto);

// deleteProduct | method: delete | path:"/api/v1/product/delete-product/:pid"
router.delete("/delete-product/:pid", isLoggedIn, isAdmin, deleteProduct);

// updateProduct | method: put | path:"/api/v1/product/update-product/:pid"
router.put("/update-product/:pid", formidable(), isLoggedIn, isAdmin, updateProduct);

export default router;
