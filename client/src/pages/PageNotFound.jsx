import React from "react";
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>PageNotFound</title>
      </Helmet>

      <div className="min-h-screen w-full flex justify-center items-center -mt-15 bg-white px-4">
        <div className="text-center pb-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[12rem] font-serif font-bold text-zinc-200 leading-none"
          >
            404
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="-mt-12 relative z-10"
          >
            <h2 className="text-3xl font-serif mb-5">Page Not Found</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
            <Link
              to="/"
              className="inline-flex items-center bg-zinc-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors group"
            >
              <ArrowLeft
                className="mr-2 group-hover:-translate-x-1 transition-transform"
                size={18}
              />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
