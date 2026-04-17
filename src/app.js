import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParcer from "cookie-parser";
import crypto from "crypto";
import authRoutes from "./routes/authRoutes.js";
import collectionRoutes from "./routes/collectionRoutes.js";
import productRoutes from "./routes/productRoute.js";

const app = express();

//middlewares
app.use(cors()); //It allows to interact with the client which is loaded in different domain
app.use(express.json()); //Instructs the app to accept the data in json format
app.use(express.urlencoded({ extended: true })); //Instructs the app to accept data in the url encoded format as well
app.use(morgan("dev")); //Logs requests, errors and more to the console
app.use(cookieParcer()); // It allows the server to acces the cookies

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/collection", collectionRoutes);
app.use("/api/v1/product", productRoutes);

//Crypto key
/*
let key = crypto.randomBytes(64).toString("hex")
console.log(key);
*/

app.get("/", (req, res) => {
  res.send("<h1>Hello !</h1>");
});

export default app;
