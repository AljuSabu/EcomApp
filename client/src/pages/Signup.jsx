import React, { useState } from "react";
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import { toast } from "sonner";
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/signup",
        { name: fullName, email, password, address, phone, role: "user" },
      );
      console.log(data);
      alert(data);
    } catch (error) {
      // toast.success("Successfully Signed Up");
      console.log(error);
      alert("Successfully Signed Up");
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      <div className="min-h-screen w-full pt-32 pb-24 flex items-center justify-center bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-200 p-8 md:p-12 w-full max-w-lg rounded-2xl shadow-xl shadow-zinc-200/50"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif mb-2">Create Account</h1>
            <p className="text-zinc-500 text-sm">
              Join our community of modern minimalists.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Address
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Phone
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Account Type
              </label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm appearance-none cursor-pointer"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center group"
            >
              Create Account
              <ArrowForwardIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-zinc-900 font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
