import express from "express";
import { createCollection } from "../controllers/collectionController.js";

const router = express.Router();

// routes
// createCollection |method:Post
router.post("/create-collection", createCollection);

export default router;
