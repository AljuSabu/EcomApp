import { instance } from "../../server.js";
import config from "../config/config.js";

// Controller function to process payment
export const processPayment = async (req, res) => {
  try {
    // Get the amount from the request body sent by the frontend
    const { amount } = req.body;

    // Create an order using Razorpay instance
    const options = {
      amount: amount * 100, // Razorpay works with paise, so multiply by 100 to convert to INR
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
    };

    // Create the order and get the response from Razorpay
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while processing payment",
    });
  }
};

// Controller function to get the Razorpay key
export const getKey = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Key fetched successfully",
      key: config.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching key",
    });
  }
};
