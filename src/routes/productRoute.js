import express from 'express'
import { createProduct, getAllProducts, productPhoto, singleProduct } from '../controllers/productController.js'
import formidable from "express-formidable"

const router = express.Router()

// createProduct | method: post | path "/api/v1/product/create-product"
router.post("/create-product", formidable(), createProduct)

// getAllProducts | methot: get |path:"/api/v1/product/get-all-products"
router.get("/get-all-products",getAllProducts)

// singleProduct | methot: get |path:"/api/v1/product/single-product/:slug"
router.get("/single-product/:slug", singleProduct)

// ProductPhoto | methot: get |path:"/api/v1/product/product-photo/:id"
router.get("/product-photo/:pid",productPhoto)

export default router   