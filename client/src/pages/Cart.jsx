import React, { useContext } from "react";
import CartContext from "../context/CartContex";
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
  const [cart, , removeFromCart, updateQuantity] = useContext(CartContext);

  //Total Quantity
  const totalQuantity = cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );

  //SubTotal
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );

  const tax = subtotal * 0.02;
  const freeShipping = 5000;
  const shipping = subtotal > freeShipping ? 0 : 50;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Cart</title>
        </Helmet>

        <div className="pt-32 pb-24 min-h-[70vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-zinc-50 rounded-full text-zinc-300 mb-6">
              <ShoppingBag size={48} />
            </div>
            <h1 className="text-4xl font-serif mb-4">Your bag is empty</h1>
            <p className="text-zinc-500 mb-12 max-w-md mx-auto">
              Looks like you haven't added anything to your bag yet. Explore our
              curated collections to find your next essential.
            </p>
            <Link
              to="/products"
              className="group inline-flex items-center bg-indigo-900 text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-indigo-950 transition-all shadow-lg shadow-indigo-900/20"
            >
              Start Shopping
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      <div className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-serif">Shopping Bag</h1>
            <Link
              to="products"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 flex items-center transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="border-t border-zinc-100">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div
                      key={`${item._id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex py-8 border-b border-zinc-100 group"
                    >
                      <div className="w-24 h-32 sm:w-32 sm:h-40 bg-zinc-100 shrink-0 overflow-hidden">
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
                              removeFromCart(item._id, item.selectedSize)
                            }
                            className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-zinc-200">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.selectedSize, -1)
                              }
                              className="p-2 text-zinc-500 hover:text-zinc-900"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-xs font-bold w-8 text-center">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.selectedSize, 1)
                              }
                              className="p-2 text-zinc-500 hover:text-zinc-900"
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
              <div className="bg-zinc-50 p-8 border border-zinc-200 sticky top-32">
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
                    <span className="text-green-600 font-medium">
                      ₹ {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-zinc-500">
                    <span>Shipping</span>

                    <span className="text-green-600 font-medium">
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
                    <span className="font-semibold text-green-600">
                      {" "}
                      free shipping
                    </span>
                  </p>
                )}

                {subtotal >= freeShipping && (
                  <p className="text-xs text-green-600 font-semibold mt-2 mb-3">
                    🎉 You've unlocked free shipping!
                  </p>
                )}

                <div className="pt-6 border-t border-zinc-200 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-serif">Total</span>
                    <span className="text-2xl font-serif font-bold text-zinc-900">
                      ₹ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-indigo-800 text-white py-5 text-xs font-bold uppercase tracking-widest hover:bg-indigo-900 transition-all shadow-lg shadow-indigo-900/20 hover:shadow-indigo-900/30 flex items-center justify-center">
                  Checkout Now
                  <ArrowRight size={16} className="ml-2" />
                </button>

                <div className="mt-8">
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-4">
                    Accepted Payments
                  </p>
                  <div className="flex space-x-3 grayscale opacity-50">
                    <div className="w-10 h-6 bg-zinc-200 rounded"></div>
                    <div className="w-10 h-6 bg-zinc-200 rounded"></div>
                    <div className="w-10 h-6 bg-zinc-200 rounded"></div>
                    <div className="w-10 h-6 bg-zinc-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
