import app from "./src/app.js";
import config from "./src/config/config.js";
import colors from "colors";
import mongoose from "mongoose";
import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL);
    console.log("Successfully Connected to MongoDB".bgBlack.magenta);

    const PORT = config.PORT;

    app.listen(PORT, () => {
      console.log(`App is succesfully running at PORT : ${PORT} `.bgBlack.blue);
    });
  } catch (error) {
    console.log(`Error in Database Connection ${error}`.bgRed.white);
  }
})();

// Immediately Invoked Function Expression (IIFE)
//JSON : JavaScript Object Notation (will be in key value pairs)
