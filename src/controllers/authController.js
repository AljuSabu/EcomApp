import User from "../models/userSchema.js";
import JWT from "jsonwebtoken";
import config from "../config/config.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

//? ///////////////////////// Signup ////////////////////////////

export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    
    // Get info from Frontend
    const { name, email, password, phone, address, role } = req.body;

    // Validation and Response
    if (!name || !email || !password || !phone || !address || !role) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    // Send response if the user exists
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "User already exists , Please login",
      });
    }

    // If the user dosent exist, Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      role,
    });

    // Create Token
    let token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY },
    );

    //Password Safety
    user.password = undefined;

    // Set up cookies
    res.cookie("token", token, cookieOptions);

    // If everythink OK, Send success response to the frontend
    res.status(201).json({
      success: true,
      message: "Successfully Signed Up",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in signing up",
      error,
    });
  }
};

//? ///////////////////// Login ////////////////////////////////

export const login = async (req, res) => {
  try {
    
    // Get info from the frontend
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid password or email",
      });
    }

    // Check if the user exist in the database
    const user = await User.findOne({ email }).select("+password");

    // If user dosent exist send response
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found , plese signup",
      });
    }

    // if user exist compare the password
    const isPasswordMatched = await user.comparePassword(password);

    // If password dosent match send response
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // If password matched generate token
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRY },
    );

    // Flush out password
    user.password = undefined;

    // Setup cookies
    res.cookie("token", token, cookieOptions);

    // Send success message
    res.status(200).json({
      success: true,
      message: "User Successfully Loggied in",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//? /////////////////// Logout ///////////////////////////////

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged  out Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: "Error in Logout",
      error,
    });
  }
};

//test controller 
export const testController = (req,res)=>{
  res.send("Protected Rotes")
}