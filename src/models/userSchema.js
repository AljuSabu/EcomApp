import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [50, "Name should not exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true],
      minLength: [8, "Password should contain atleast 8 characters"],
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxLength: [120, "Address should not exceed 120 characters"],
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values.AuthRoles,
      default: AuthRoles.USER,
    },
  },
  { timestamps: true },
);

// Encrypt password before saving | you can use mongoose hooks
// userSchema.pre("save", async function (next) {
//   try {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
//   } catch (error) {
//     console.log("from schema", error);
//   }
// });

userSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log("from schema", error);
  }
});

// Schema Methods
userSchema.methods = {
  comparePassword: async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  },
};

export default mongoose.model("User", userSchema);
