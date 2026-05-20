// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CartContext from "../context/CartContex";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  Mail,
  Phone,
  Printer,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [, setCart] = useContext(CartContext);

  useEffect(() => {
    const data = searchParams.get("paymentData");

    if (data) {
      const parseData = {
        items: [], // Initialize items as an empty array
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

  return (
    <>
      <div className="pt-15 pb-24 bg-zinc-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-zinc-200 shadow-xl overflow-hidden"
          >
            {/* Success Banner */}
            <div className="bg-zinc-900 text-white p-12 text-center relative overflow-hidden">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-6 backdrop-blur-sm border border-white/20">
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <h1 className="text-4xl font-serif mb-2">
                  Thank you for your order
                </h1>
                <p className="text-zinc-400 max-w-md mx-auto grayscale italic">
                  Your order has been placed successfully and is being
                  processed.
                </p>
              </motion.div>

              {/* Background pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                  }}
                ></div>
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                {/* Order Info */}
                <div className="space-y-10">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center">
                      <ShieldCheck size={14} className="mr-2" />
                      Security & Verification
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Order Status</span>
                        <span
                          className={`px-2 py-0.5 ${isPaymentSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} text-[10px] font-bold uppercase tracking-wider rounded-full border border-green-100`}
                        >
                          {isPaymentSuccess ? "Paid" : "Unsuccessful"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Payment ID</span>
                        <span className="font-mono text-zinc-900 font-medium">
                          {paymentData?.paymentId}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Order ID</span>
                        <span className="font-mono text-zinc-900 font-medium">
                          {paymentData?.orderId}
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
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Date</span>
                        <span className="text-zinc-900 font-medium">
                          {paymentData?.date}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Payment Method</span>
                        <div className="flex items-center text-zinc-900 font-medium">
                          {paymentData?.method}
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-500">Total Amount</span>
                        <span className="text-lg font-serif font-bold text-zinc-900">
                          {paymentData?.currency} {paymentData?.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center">
                      <Mail size={14} className="mr-2" />
                      Contact Information
                    </h3>
                    <div className="bg-zinc-50 p-6 border border-zinc-200 space-y-6">
                      <div className="flex items-start">
                        <Mail size={16} className="text-zinc-400 mr-3 mt-0.5" />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            Email
                          </p>
                          <p className="text-sm text-zinc-900 font-medium">
                            {paymentData?.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone
                          size={16}
                          className="text-zinc-400 mr-3 mt-0.5"
                        />
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            Phone
                          </p>
                          <p className="text-sm text-zinc-900 font-medium">
                            {paymentData?.contact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-zinc-200 bg-white shadow-sm flex items-center justify-between">
                    <p className="text-xs text-zinc-500 italic">
                      Need help with your order?
                    </p>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-primary border-b border-primary pb-0.5">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 border-t border-zinc-300 pt-12">
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center px-8 py-4 border border-zinc-200 text-xs font-bold uppercase tracking-widest text-zinc-600 hover:bg-zinc-100 transition-colors"
                >
                  <Printer size={16} className="mr-2" />
                  Print Receipt
                </button>
                <Link
                  to="/products"
                  onClick={() => {
                    (setCart([]), localStorage.removeItem("cart"));
                  }}
                  className="flex-2 flex items-center justify-center px-8 py-4 bg-indigo-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-lg shadow-primary/20"
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
    </>
  );
};

export default PaymentSuccessPage;
