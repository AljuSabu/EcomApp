import express from "express";
import { getKey, processPayment } from "../controllers/paymentController.js";

const router = express.Router();

// Route to process payment
router.post("/process-payment", processPayment);

// Route to get Razorpay key
router.get("/get-key", getKey);

export default router;
