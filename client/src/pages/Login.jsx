import React from "react";
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/auth/login",
        { email, password },
      );
      console.log(data);
      alert(data);
    } catch (error) {
      console.log(error);
      alert("Successfully logged in");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-screen w-full pt-32 pb-24 flex items-center justify-center bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-taupe-200 p-8 md:p-12 w-full rounded-2xl max-w-lg shadow-xl shadow-zinc-200/50"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
            <p className="text-zinc-500 text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div> */}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Address
              </label>
              <input
                type="text"
                name="address"
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-zinc-900 focus:outline-none transition-colors text-sm"
              />
            </div> */}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Account Type
              </label>
              <select
                name="role"
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
              Sign In
              <ArrowForwardIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
