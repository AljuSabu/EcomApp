import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  Printer,
  MapPin,
  CreditCard,
  X,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { userOrder } from "../../data/data";
import { useCart } from "../../context/CartContext";

const FILTERS = ["All", "Processing", "In Transit", "Delivered", "Cancelled"];

const UserOrders = () => {
  // Local order state 
  const [orders, setOrders] = useState(userOrder);
  const { addToCart } = useCart();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reorderedNotice, setReorderedNotice] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All" || order.status === activeFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(q) ||
      order.items.some((item) => item.name.toLowerCase().includes(q)) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <CheckCircle2 size={12} className="mr-1.5" />
            Delivered
          </span>
        );
      case "In Transit":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
            <Truck size={12} className="mr-1.5" />
            In Transit
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200/60">
            <Clock size={12} className="mr-1.5" />
            Processing
          </span>
        );
      case "Cancelled":
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600 border border-zinc-200">
            <XCircle size={12} className="mr-1.5" />
            Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.quantity || 1);
    });
    setReorderedNotice(true);
    toast.success("Items added to your bag");
    setTimeout(() => setReorderedNotice(false), 3000);
  };

  const handleCancelClick = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o)),
      );
      if (selectedOrder?.id === orderId) {
        setSelectedOrder((prev) =>
          prev ? { ...prev, status: "Cancelled" } : null,
        );
      }
      toast.success("Order cancelled");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif mb-2">My Orders & History</h1>
          <p className="text-zinc-500 text-sm">
            Track active shipments, view invoices, and manage past purchases.
          </p>
        </div>
        <Link
          to="/products"
          className="self-start sm:self-auto inline-flex items-center px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-sm"
        >
          Continue Shopping
        </Link>
      </div>

      {reorderedNotice && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold uppercase tracking-wider flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Items from this order were added to your shopping bag!</span>
          </div>
          <Link
            to="/dashboard/user/cart"
            className="underline hover:text-emerald-950 font-bold"
          >
            View Bag
          </Link>
        </motion.div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-zinc-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {FILTERS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-md whitespace-nowrap transition-colors ${
                activeFilter === tab
                  ? "bg-zinc-900 text-white"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            placeholder="Search by order # or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg text-xs outline-none focus:border-zinc-900 text-zinc-900 bg-zinc-50/50"
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-16 text-center">
          <ShoppingBag size={48} className="mx-auto text-zinc-300 mb-4" />
          <h3 className="text-lg font-serif mb-2 text-zinc-900">
            No Orders Found
          </h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-6">
            We couldn't find any orders matching your selected filters. Explore
            our latest arrivals to place a new order.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden transition-all hover:border-zinc-200 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="bg-zinc-50/80 p-5 sm:px-6 border-b border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                      Order Placed
                    </span>
                    <span className="text-xs font-medium text-zinc-900">
                      {order.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                      Total Amount
                    </span>
                    <span className="text-xs font-bold font-serif text-zinc-900">
                      ₹{order.total.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block">
                      Order Reference
                    </span>
                    <span className="font-mono text-xs font-bold text-zinc-900">
                      {order.orderNumber}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {getStatusBadge(order.status)}
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-3.5 py-1.5 bg-white border border-zinc-200 rounded-lg hover:border-zinc-400 text-xs font-bold uppercase tracking-wider text-zinc-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="p-6 divide-y divide-zinc-100">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-20 bg-zinc-100 shrink-0 overflow-hidden rounded-lg border border-zinc-100">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-900 mb-0.5">
                          {item.name}
                        </h4>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium mb-1">
                          Size: {item.selectedSize || "Standard"} • Qty:{" "}
                          {item.quantity}
                        </p>
                        <p className="text-xs font-semibold text-zinc-800">
                          {item.price}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 transition-colors"
                      >
                        View Product
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-3.5 bg-zinc-50/50 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-zinc-500 flex items-center">
                  {order.trackingNumber ? (
                    <>
                      <Truck size={14} className="mr-1.5 text-zinc-400" />
                      <span>
                        Tracking:{" "}
                        <span className="font-mono text-zinc-800 font-semibold">
                          {order.trackingNumber}
                        </span>
                      </span>
                    </>
                  ) : (
                    <span>Payment Method: {order.paymentMethod}</span>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleReorder(order)}
                    className="flex items-center text-zinc-900 font-bold uppercase tracking-wider text-[11px] hover:underline"
                  >
                    <RotateCcw size={13} className="mr-1" />
                    Buy Again
                  </button>
                  {order.status === "Processing" && (
                    <button
                      onClick={() => handleCancelClick(order.id)}
                      className="text-rose-600 font-bold uppercase tracking-wider text-[11px] hover:underline"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-xl border border-zinc-100 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-serif text-zinc-900">
                      Order Details
                    </h2>
                    <span className="font-mono text-xs font-bold text-zinc-500">
                      ({selectedOrder.orderNumber})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Placed on {selectedOrder.date}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Progress Tracker */}
                <div className="bg-zinc-50 p-6 rounded-lg border border-zinc-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                      Shipment Status
                    </h3>
                    {getStatusBadge(selectedOrder.status)}
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    <div className="space-y-2">
                      <div className="w-6 h-6 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-zinc-900">Confirmed</span>
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                          selectedOrder.status !== "Cancelled"
                            ? "bg-emerald-600 text-white"
                            : "bg-zinc-200 text-zinc-400"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                      </div>
                      <span
                        className={
                          selectedOrder.status !== "Cancelled"
                            ? "text-zinc-900"
                            : ""
                        }
                      >
                        Processed
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                          selectedOrder.status === "In Transit" ||
                          selectedOrder.status === "Delivered"
                            ? "bg-emerald-600 text-white"
                            : "bg-zinc-200 text-zinc-400"
                        }`}
                      >
                        <Truck size={14} />
                      </div>
                      <span
                        className={
                          selectedOrder.status === "In Transit" ||
                          selectedOrder.status === "Delivered"
                            ? "text-zinc-900"
                            : ""
                        }
                      >
                        In Transit
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div
                        className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                          selectedOrder.status === "Delivered"
                            ? "bg-emerald-600 text-white"
                            : "bg-zinc-200 text-zinc-400"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                      </div>
                      <span
                        className={
                          selectedOrder.status === "Delivered"
                            ? "text-zinc-900"
                            : ""
                        }
                      >
                        Delivered
                      </span>
                    </div>
                  </div>

                  {selectedOrder.trackingNumber && (
                    <div className="mt-6 pt-4 border-t border-zinc-200/60 flex flex-wrap items-center justify-between text-xs">
                      <div>
                        <span className="text-zinc-400 font-medium">
                          Carrier:{" "}
                        </span>
                        <span className="font-semibold text-zinc-800">
                          {selectedOrder.carrier || "Express Delivery"}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400 font-medium">
                          Tracking #:{" "}
                        </span>
                        <span className="font-mono font-semibold text-zinc-900">
                          {selectedOrder.trackingNumber}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                    Items ({selectedOrder.items.length})
                  </h3>
                  <div className="divide-y divide-zinc-100 border-t border-b border-zinc-100">
                    {selectedOrder.items.map((item, i) => (
                      <div
                        key={i}
                        className="py-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-16 object-cover rounded-lg border border-zinc-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="text-sm font-semibold text-zinc-900">
                              {item.name}
                            </p>
                            <p className="text-xs text-zinc-400">
                              Size: {item.selectedSize} • Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm font-serif font-bold text-zinc-900">
                          ₹{(item.priceValue * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50 rounded-lg p-6 border border-zinc-100 text-xs">
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center">
                      <MapPin size={14} className="mr-1.5" />
                      Delivery Address
                    </h4>
                    <p className="text-zinc-700 leading-relaxed">
                      {selectedOrder.shippingAddress}
                    </p>

                    <h4 className="font-bold uppercase tracking-wider text-zinc-400 mt-4 mb-2 flex items-center">
                      <CreditCard size={14} className="mr-1.5" />
                      Payment Details
                    </h4>
                    <p className="text-zinc-700">
                      {selectedOrder.paymentMethod}
                    </p>
                    <p className="font-mono text-[11px] text-zinc-400">
                      {selectedOrder.paymentId}
                    </p>
                  </div>

                  <div className="space-y-2 sm:border-l sm:border-zinc-200 sm:pl-6">
                    <div className="flex justify-between text-zinc-500">
                      <span>Subtotal</span>
                      <span className="text-zinc-900 font-medium">
                        ₹{selectedOrder.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">
                        {selectedOrder.shipping === 0
                          ? "Free"
                          : `₹${selectedOrder.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-500">
                      <span>Estimated Tax</span>
                      <span className="text-zinc-900 font-medium">
                        ₹{selectedOrder.tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-bold text-zinc-900 pt-3 border-t border-zinc-200">
                      <span>Total Paid</span>
                      <span>₹{selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="flex items-center text-xs font-bold uppercase tracking-wider text-zinc-600 hover:text-zinc-900"
                >
                  <Printer size={16} className="mr-2" />
                  Print Receipt
                </button>
                <button
                  onClick={() => handleReorder(selectedOrder)}
                  className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                >
                  Reorder Items
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserOrders;
