import { stat } from "fs";
import { instance } from "../../server.js";
import config from "../config/config.js";
import crypto from "crypto";

// Controller function to process payment
export const processPayment = async (req, res) => {
  try {
    // Get the amount from the request body sent by the frontend
    const { amount, items } = req.body;

    // Create an order using Razorpay instance
    const options = {
      amount: amount * 100, // Razorpay works with paise, so multiply by 100 to convert to INR
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
      notes: {
        items: JSON.stringify(items), // Store the items in the notes for reference
      },
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
export const getKey = async (req, res) => {
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

// Controller function to verify payment
export const paymentVerification = async (req, res) => {
  try {
    // Get the payment details from the request body sent by the frontend
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // Create the expected signature using the order ID and payment ID
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    // Generate the expected signature using HMAC SHA256 algorithm and the Razorpay key secret
    const expectedSignature = crypto
      .createHmac("sha256", config.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // console.log("Expected Signature:", expectedSignature);
    // console.log("Razorpay Signature:", razorpay_signature);

    if (expectedSignature === razorpay_signature) {
      // Fetch the payment details from Razorpay using the payment ID
      const paymentDetails = await instance.payments.fetch(razorpay_payment_id);

      // Fetch the order details from Razorpay using the order ID
      const orderDetails = await instance.orders.fetch(razorpay_order_id);

      // Prepare the items from the order details for further processing (e.g., saving to database, sending confirmation email, etc.)
      const items = JSON.parse(orderDetails.notes.items || "[]");

      const paymentData = {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        amount: paymentDetails.amount / 100, // Convert back to INR
        currency: paymentDetails.currency,
        method: paymentDetails.method,
        email: paymentDetails.email,
        contact: paymentDetails.contact,
        status: paymentDetails.status,
        date: new Date().toLocaleString(), // Add the current date and time
        items, // Include the items from the order details
      };

      // Encode the payment data as a URL parameter to send back to the frontend
      const encodedPaymentData = encodeURIComponent(
        JSON.stringify(paymentData),
      );

      return res.redirect(
        `http://localhost:5173/payment/payment-success?paymentData=${encodedPaymentData}`,
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while verifying payment",
    });
  }
};
