import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollection,
  singleColletion,
  UpdateCollection,
} from "../controllers/collectionController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

// routes
// createCollection |method:Post
router.post("/create-collection", isLoggedIn, isAdmin, createCollection);

// get all collection
router.get("/get-all-collection", getAllCollection);

// Delete Collection
router.delete("/delete-collection/:id", isLoggedIn, isAdmin, deleteCollection);

// Get Single Collection
router.get("/single-collection/:id", isLoggedIn, singleColletion);

// Update Collection
router.put("/update-collection/:id", UpdateCollection);

export default router;
