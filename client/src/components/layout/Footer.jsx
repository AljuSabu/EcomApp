import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      // Dummy
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success("You're subscribed! Welcome to the list.");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                  to="/products"
                  className="hover:text-zinc-900 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-zinc-900 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-zinc-900 transition-colors"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/user/wishlist"
                  className="hover:text-zinc-900 transition-colors"
                >
                  Wishlist
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
                  to="/about"
                  className="hover:text-zinc-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-zinc-900 transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <span
                  className="text-zinc-300 cursor-not-allowed"
                  title="Coming soon"
                >
                  Careers
                </span>
              </li>
              <li>
                <span
                  className="text-zinc-300 cursor-not-allowed"
                  title="Coming soon"
                >
                  Press
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-zinc-900 mb-6 uppercase text-xs tracking-widest">
              Newsletter
            </h4>
            <p className="text-zinc-500 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe} className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="bg-white border border-zinc-200 rounded-l-lg px-4 py-2.5 text-sm w-full outline-none focus:border-zinc-900 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-zinc-900 text-white px-4 py-2.5 rounded-r-lg text-sm font-medium hover:bg-zinc-800 transition-colors disabled:bg-zinc-400 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isSubmitting ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-zinc-400 text-xs">
            © {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-zinc-400">
            <span className="cursor-not-allowed" title="Coming soon">
              Privacy Policy
            </span>
            <span className="cursor-not-allowed" title="Coming soon">
              Terms of Service
            </span>
            <span className="cursor-not-allowed" title="Coming soon">
              Shipping Info
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
