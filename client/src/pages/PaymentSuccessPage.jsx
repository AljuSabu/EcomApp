// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Printer,
  ShieldCheck,
  ShoppingBag,
  XCircle,
} from "lucide-react";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const { setCart } = useCart();

  useEffect(() => {
    const data = searchParams.get("paymentData");

    if (data) {
      const parseData = {
        items: [],
        ...JSON.parse(decodeURIComponent(data)),
      };

      localStorage.setItem("paymentData", JSON.stringify(parseData));
      setPaymentData(parseData);
    } else {
      const storedData = localStorage.getItem("paymentData");
      if (storedData) {
        setPaymentData(JSON.parse(storedData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPaymentSuccess = paymentData?.status === "captured";

  const handleContinueShopping = () => {
    // Only clear the cart if payment actually succeeded — clearing it on a
    // failed payment would wipe out what the customer was trying to buy.
    if (isPaymentSuccess) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  return (
    <div className="pt-8 sm:pt-12 lg:pt-15 pb-12 sm:pb-16 lg:pb-24 bg-zinc-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-zinc-100 shadow-xl overflow-hidden"
        >
          {/* Banner */}
          <div
            className={`${isPaymentSuccess ? "bg-zinc-900" : "bg-rose-900"} text-white p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden`}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20">
                {isPaymentSuccess ? (
                  <CheckCircle2
                    size={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  />
                ) : (
                  <XCircle
                    size={40}
                    className="w-8 h-8 sm:w-10 sm:h-10 text-white"
                  />
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif mb-2">
                {isPaymentSuccess
                  ? "Thank you for your order"
                  : "Payment Unsuccessful"}
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 max-w-md mx-auto">
                {isPaymentSuccess
                  ? "Your order has been placed successfully and is being processed."
                  : "Something went wrong processing your payment. Your cart has been kept so you can try again."}
              </p>
            </motion.div>

            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-8 lg:mb-12">
              {/* Order Info */}
              <div className="space-y-8 lg:space-y-10">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center">
                    <ShieldCheck size={14} className="mr-2" />
                    Security & Verification
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-zinc-500">Order Status</span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${
                          isPaymentSuccess
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : "bg-rose-50 text-rose-700 border-rose-200/60"
                        }`}
                      >
                        {isPaymentSuccess ? "Paid" : "Unsuccessful"}
                      </span>
                    </div>
                    {/* break-all lets long payment/order IDs wrap instead of running off the screen */}
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-zinc-500 shrink-0">Payment ID</span>
                      <span className="font-mono text-zinc-900 font-medium text-right break-all">
                        {paymentData?.paymentId || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-zinc-500 shrink-0">Order ID</span>
                      <span className="font-mono text-zinc-900 font-medium text-right break-all">
                        {paymentData?.orderId || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center">
                    <Calendar size={14} className="mr-2" />
                    Transaction Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-zinc-500">Date</span>
                      <span className="text-zinc-900 font-medium text-right">
                        {paymentData?.date || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-zinc-500">Payment Method</span>
                      <span className="text-zinc-900 font-medium text-right">
                        {paymentData?.method || "—"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-3 text-sm">
                      <span className="text-zinc-500">Total Amount</span>
                      <span className="text-base sm:text-lg font-serif font-bold text-zinc-900 text-right">
                        {paymentData?.currency} {paymentData?.amount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-6 lg:space-y-8">
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center">
                    <Mail size={14} className="mr-2" />
                    Contact Information
                  </h3>
                  <div className="bg-zinc-50 rounded-lg p-4 sm:p-6 border border-zinc-100 space-y-5 sm:space-y-6">
                    <div className="flex items-start">
                      <Mail
                        size={16}
                        className="text-zinc-400 mr-3 mt-0.5 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Email
                        </p>
                        <p className="text-sm text-zinc-900 font-medium wrap-break-word">
                          {paymentData?.email || "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone
                        size={16}
                        className="text-zinc-400 mr-3 mt-0.5 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Phone
                        </p>
                        <p className="text-sm text-zinc-900 font-medium wrap-break-word">
                          {paymentData?.contact || "—"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 rounded-lg border border-zinc-100 bg-white shadow-sm flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-zinc-500 italic">
                    Need help with your order?
                  </p>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-900 pb-0.5">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 border-t border-zinc-100 pt-8 lg:pt-12">
              <button
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 border border-zinc-200 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                <Printer size={16} className="mr-2" />
                Print Receipt
              </button>
              <Link
                to="/products"
                onClick={handleContinueShopping}
                className="flex-2 flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-sm"
              >
                <ShoppingBag size={16} className="mr-2" />
                Continue Shopping
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;