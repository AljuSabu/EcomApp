import { Helmet } from "react-helmet";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import { ArrowRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password,
      });
      if (data && data.success) {
        toast.success(data.message);
        setAuth({
          ...auth,
          user: data.user,
          token: data.token,
        });
        localStorage.setItem("auth", JSON.stringify(data));
        navigate(location.state?.from || "/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong during login",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-screen w-full pt-10 pb-10 flex items-center justify-center bg-zinc-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 w-full rounded-2xl max-w-lg border border-zinc-200 shadow-xl shadow-zinc-200/60"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
            <p className="text-zinc-500 text-sm">
              Please enter your details to sign in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:border-zinc-900 outline-none transition-colors text-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-zinc-900"
                >
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:border-zinc-900 outline-none transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center justify-center group disabled:bg-zinc-300 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
              {!isSubmitting && (
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link to="/signup" className="text-zinc-900 font-bold hover:underline">
                Join the Club
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;