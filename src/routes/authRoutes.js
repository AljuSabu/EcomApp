import express from "express";
import {
  login,
  logout,
  signup,
  testController,
} from "../controllers/authController.js";
import { isAdmin, isLoggedIn } from "../middlewares/authMiddlewares.js";

const router = express.Router();

//Routes
// signup | method:post | /api/v1/auth/signup
router.post("/signup", signup);

// login | method:post | /api/v1/auth/login
router.post("/login", login);

// logout | method:post | /api/v1/logout
router.post("/logout", logout);

// test route
router.get("/test", isLoggedIn, isAdmin, testController);

export default router;
