import { useContext, useState } from "react";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { Helmet } from "react-helmet";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { auth } = useContext(AuthContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const checkout = async (amount) => {
    if (isCheckingOut) return;

    setIsCheckingOut(true);
    try {
      const { data: orderdata } = await axios.post("/payment/process-payment", {
        amount,
      });
      const { order } = orderdata;

      const { data: keydata } = await axios.get("/payment/get-key");
      const { key } = keydata;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "LUXE Commerce",
        description: "Test Transaction",
        order_id: order.id,
        callback_url:
          "http://localhost:4000/api/v1/payment/payment-verification",
        prefill: {
          name: auth?.user?.name || "",
          email: auth?.user?.email || "",
          contact: auth?.user?.phone || "",
        },
        theme: {
          color: "#18181b",
        },
        modal: {
          ondismiss: () => {
            setIsCheckingOut(false);
          },
        },
      };

      if (!window.Razorpay) {
        toast.error(
          "Payment could not be loaded. Please refresh and try again.",
        );
        setIsCheckingOut(false);
        return;
      }

      localStorage.setItem("checkoutItems", JSON.stringify(cart));

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", (response) => {
        toast.error(
          response?.error?.description || "Payment failed. Please try again.",
        );
        setIsCheckingOut(false);
      });

      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        "Something went wrong while starting checkout. Please try again.",
      );
      setIsCheckingOut(false);
    }
  };

  const tax = subtotal * 0.02;
  const freeShipping = 5000;
  const shipping = subtotal > freeShipping ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <Helmet>
          <title>Cart</title>
        </Helmet>

        <div className="pt-26 pb-24 min-h-[70vh] flex items-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="bg-white border border-zinc-100 rounded-xl p-16 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mx-auto mb-4 text-zinc-400">
                <ShoppingBag size={32} />
              </div>
              <h2 className="text-3xl font-serif text-zinc-900 mb-2">
                Your bag is empty
              </h2>
              <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Looks like you haven't added anything to your bag yet. Explore
                our curated collections to find your next essential.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-lg"
              >
                Explore Catalog
                <ArrowRight size={14} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <Helmet>
        <title>Cart</title>
      </Helmet>

      
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-serif mb-2">Shopping Bag</h1>
              <p className="text-zinc-500 text-sm">
                Review your handpicked selections and complete your journey to
                timeless style.
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 flex items-center transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-xl border border-zinc-100 shadow-sm divide-y divide-zinc-100 px-6">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item._id}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex py-8 group"
                    >
                      <div className="w-24 h-32 sm:w-32 sm:h-40 bg-zinc-100 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={`http://localhost:4000/api/v1/product/product-photo/${item._id}`}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="ml-6 grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-zinc-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-zinc-400 mb-2 uppercase tracking-widest font-bold">
                              {item.description}
                            </p>
                            <p className="text-sm font-semibold">
                              ₹ {item.price}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              removeFromCart(item._id)
                            }
                            className="p-2 text-zinc-300 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, -1)
                              }
                              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-xs font-bold w-8 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, 1)
                              }
                              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-zinc-900">
                            ₹{" "}
                            {((item.price || 0) * (item.quantity || 1)).toFixed(
                              2,
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-8 sticky top-32">
                <h2 className="text-xl font-serif mb-8">Order Summary</h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Total Quantity</span>
                    <span className="text-zinc-900 font-medium">
                      {totalQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Subtotal</span>
                    <span className="text-emerald-600 font-medium">
                      ₹ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Shipping</span>
                    <span className="text-emerald-600 font-medium">
                      {shipping === 0 ? "Free" : `₹ ${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Estimated Tax</span>
                    <span className="text-zinc-900 font-medium">
                      ₹ {tax.toFixed(2)} (2%)
                    </span>
                  </div>
                </div>

                {subtotal < freeShipping && (
                  <p className="text-xs text-zinc-500 mt-2 mb-3">
                    Add ₹ {(freeShipping - subtotal).toFixed(0)} more to get
                    <span className="font-semibold text-emerald-600">
                      {" "}
                      free shipping
                    </span>
                  </p>
                )}

                {subtotal >= freeShipping && (
                  <p className="text-xs text-emerald-600 font-semibold mt-2 mb-3">
                    🎉 You've unlocked free shipping!
                  </p>
                )}

                <div className="pt-6 border-t border-zinc-100 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-serif">Total</span>
                    <span className="text-2xl font-serif font-bold text-zinc-900">
                      ₹ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => checkout(total)}
                  disabled={isCheckingOut}
                  className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center disabled:bg-zinc-300 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {isCheckingOut ? "Processing..." : "Checkout Now"}
                  {!isCheckingOut && <ArrowRight size={16} className="ml-2" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      
    </motion.div>
  );
};

export default Cart;
