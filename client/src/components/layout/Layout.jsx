import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Toaster } from "sonner";

const Layout = ({ description, keywords, author, title }) => {
  return (
    <>
      <Toaster position="top-right" />
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="min-h-screen pt-20 overflow-hidden">
        <Navbar />

        <main className="flex grow">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
