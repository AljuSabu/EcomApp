import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-zinc-50 border-t border-zinc-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link
                to="/"
                className="text-2xl font-serif font-bold tracking-tighter mb-6 block"
              >
                LUXE<span className="text-zinc-400">.</span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Elevating your everyday with curated essentials designed for the
                modern lifestyle. Quality, sustainability, and timeless design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-6 uppercase text-xs tracking-widest">
                Shop
              </h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li>
                  <Link
                    to="collection"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to="collection"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    to="collection"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    to="collection"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-6 uppercase text-xs tracking-widest">
                Company
              </h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li>
                  <Link
                    to="about"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="about"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    to="about"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="about"
                    className="hover:text-zinc-900 transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-6 uppercase text-xs tracking-widest">
                Newsletter
              </h4>
              <p className="text-zinc-500 text-sm mb-4">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white border border-zinc-200 px-4 py-2 text-sm w-full focus:outline-none focus:border-zinc-900"
                />
                <button className="bg-zinc-900 text-white px-4 py-2 text-sm font-medium hover:bg-zinc-800 transition-colors">
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-zinc-400 text-xs">
              © 2024 LUXE. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-zinc-400">
              <p className="hover:text-zinc-900">
                Privacy Policy
              </p>
              <p className="hover:text-zinc-900">
                Terms of Service
              </p>
              <p className="hover:text-zinc-900">
                Shipping Info
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
