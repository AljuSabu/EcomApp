import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  productPhoto,
  singleProduct,
  updateProduct,
  productFilter,
  productCount,
  productList,
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

// productPhoto | methot: get | path:"/api/v1/product/product-photo/:id"
router.get("/product-photo/:id", productPhoto);

// deleteProduct | method: delete | path:"/api/v1/product/delete-product/:id"
router.delete("/delete-product/:id", isLoggedIn, isAdmin, deleteProduct);

// updateProduct | method: put | path:"/api/v1/product/update-product/:id"
router.put("/update-product/:id", formidable(), isLoggedIn, isAdmin, updateProduct);

// Filter products | method: post | path:"/api/v1/product/product-filter"
router.post("/product-filter", productFilter);

// Product Count | method: get | path:"/api/v1/product/product-count"
router.get("/product-count", productCount);

// Product List | method: get | path:"/api/v1/product/product-list/:page"
router.get("/product-list/:page",productList)

export default router;
