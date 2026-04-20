import JWT from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/userSchema.js";
import AuthRoles from "../utils/AuthRoles.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token;

    // Check cookie
    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // Check Authorization header
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const decoded = JWT.verify(token, config.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

//isAdmin
export const isAdmin = async (req, res, next) => {
  try {
    // req.user comes from isLoggedIn
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role.toLowerCase() !== AuthRoles.ADMIN.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this page",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
