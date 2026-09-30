import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Award,
  Truck,
  ArrowUpRight,
  ChevronRight,
  Package,
  CreditCard,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

// TEMP MOCK DATA — replace with a real UserContext / orders API later.
// Swap this block out once you build GET /order/get-orders and a profile endpoint.
const mockProfile = {
  memberTier: "Gold Member",
  memberSince: "Jan 2024",
  storeCredit: 1250,
  rewardPoints: 3400,
  address: {
    street: "221B Marine Drive",
    city: "Kochi",
    state: "Kerala",
    zip: "682001",
    country: "India",
  },
  phone: "+91 93868 16437",
};

const mockOrders = [
  {
    id: "1",
    orderNumber: "LX-10234",
    status: "In Transit",
    carrier: "Bluedart",
    estimatedDelivery: "In 2-3 Days",
    date: "12 Sep 2026",
    total: 8499,
    items: [
      { name: "Silk Scarf", image: "https://placehold.co/100x120?text=1" },
      { name: "Leather Belt", image: "https://placehold.co/100x120?text=2" },
    ],
  },
  {
    id: "2",
    orderNumber: "LX-10201",
    status: "Delivered",
    date: "02 Sep 2026",
    total: 4299,
    items: [
      { name: "Classic Watch", image: "https://placehold.co/100x120?text=3" },
    ],
  },
];

const UserDashboard = () => {
  const { auth } = useContext(AuthContext);
  const { wishlist } = useWishlist();
  const { cart, addToCart } = useCart();

  const profile = {
    name: auth?.user?.name || "Guest",
    avatar:
      auth?.user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth?.user?.name || "Guest",
      )}&background=18181b&color=fff`,
    ...mockProfile,
  };

  const orders = mockOrders;
  const recentOrders = orders.slice(0, 3);
  const activeOrders = orders.filter(
    (o) => o.status === "In Transit" || o.status === "Processing",
  );

  const stats = [
    {
      name: "Total Orders",
      value: `${orders.length}`,
      subtext: `${activeOrders.length} active delivery`,
      icon: ShoppingBag,
      link: "/dashboard/user/orders",
      accent: "text-primary",
    },
    {
      name: "Saved Wishlist",
      value: `${wishlist.length} items`,
      subtext: "Ready to purchase",
      icon: Heart,
      link: "/dashboard/user/wishlist",
      accent: "text-rose-600",
    },
    {
      name: "Reward Credits",
      value: `₹${profile.storeCredit.toFixed(2)}`,
      subtext: `${profile.rewardPoints} Loyalty Points`,
      icon: Award,
      link: "/dashboard/user/profile",
      accent: "text-amber-600",
    },
    {
      name: "Active Shipments",
      value: `${activeOrders.length}`,
      subtext: activeOrders.length > 0 ? "On the way" : "All delivered",
      icon: Truck,
      link: "/dashboard/user/orders",
      accent: "text-blue-600",
    },
  ];

  const handleQuickAddToCart = (item) => {
    const alreadyInCart = cart.some((p) => p._id === item._id);
    if (alreadyInCart) {
      return toast.error("Already in cart");
    }
    addToCart(item, 1);
    toast.success(`"${item.name}" added to bag`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-xl border border-zinc-100 shadow-sm">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-zinc-100 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <CheckCircle2 size={12} className="text-white" />
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-serif text-zinc-900 leading-tight">
                Welcome back, {profile.name.split(" ")[0]}
              </h1>
              <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                {profile.memberTier}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-500">
              Manage your personal preferences, tracking shipments, and saved
              luxury favorites.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto pt-2 md:pt-0">
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-sm"
          >
            Explore Store
            <ArrowUpRight size={14} className="ml-1.5" />
          </Link>
          <Link
            to="/dashboard/user/profile"
            className="inline-flex items-center px-4 py-2.5 border border-zinc-200 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            Account Settings
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.link}
            className="bg-white p-6 rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-200 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2.5 bg-zinc-50 rounded-lg ${stat.accent} group-hover:scale-105 transition-transform`}
              >
                <stat.icon size={20} />
              </div>
              <ChevronRight
                size={16}
                className="text-zinc-300 group-hover:text-zinc-600 transition-colors"
              />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
              {stat.name}
            </h3>
            <p className="text-2xl font-serif text-zinc-900 mb-1">
              {stat.value}
            </p>
            <p className="text-[11px] text-zinc-500 font-medium">
              {stat.subtext}
            </p>
          </Link>
        ))}
      </div>

      {/* Active Shipment Alert */}
      {activeOrders.length > 0 && (
        <div className="bg-zinc-900 text-white p-6 rounded-xl sm:flex items-center justify-between shadow-lg">
          <div className="flex items-start space-x-4 mb-4 sm:mb-0">
            <div className="p-3 bg-white/10 rounded-full shrink-0">
              <Truck size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                  Live Delivery
                </span>
                <span className="text-xs text-white/50">•</span>
                <span className="text-xs text-white/80 font-mono">
                  {activeOrders[0].orderNumber}
                </span>
              </div>
              <p className="text-sm font-medium text-white">
                Package is in transit with{" "}
                {activeOrders[0].carrier || "Standard Courier"}.
              </p>
              <p className="text-xs text-white/60 mt-0.5">
                Expected Arrival:{" "}
                <span className="text-white font-medium">
                  {activeOrders[0].estimatedDelivery || "In 2-3 Days"}
                </span>
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/user/orders"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-zinc-900 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-colors shrink-0"
          >
            Track Order
            <ChevronRight size={14} className="ml-1" />
          </Link>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <Package size={18} className="text-zinc-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
                  Recent Orders
                </h2>
              </div>
              <Link
                to="/dashboard/user/orders"
                className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-hover flex items-center transition-colors"
              >
                View All Orders
                <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={36} className="mx-auto text-zinc-300 mb-3" />
                <p className="text-sm font-medium text-zinc-700">
                  No orders placed yet
                </p>
                <p className="text-xs text-zinc-400 mt-1 mb-4">
                  Start discovering signature luxury goods in our collection.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex -space-x-3 overflow-hidden shrink-0">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <img
                            key={idx}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-14 object-cover border-2 border-white shadow-xs rounded"
                            referrerPolicy="no-referrer"
                          />
                        ))}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-mono text-xs font-bold text-zinc-900">
                            {order.orderNumber}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                : order.status === "In Transit"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200/50"
                                  : order.status === "Processing"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                                    : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500">
                          {order.items.length}{" "}
                          {order.items.length === 1 ? "item" : "items"} • Placed
                          on {order.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="text-left sm:text-right">
                        <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">
                          Total
                        </p>
                        <p className="text-sm font-serif font-bold text-zinc-900">
                          ₹{order.total.toFixed(2)}
                        </p>
                      </div>
                      <Link
                        to="/dashboard/user/orders"
                        className="px-3.5 py-1.5 border border-zinc-200 rounded-lg text-xs font-bold uppercase tracking-wider text-zinc-700 hover:bg-zinc-50 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Highlights */}
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
              <div className="flex items-center space-x-2">
                <Heart size={18} className="text-rose-500" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
                  Wishlist Highlights
                </h2>
              </div>
              <Link
                to="/dashboard/user/wishlist"
                className="text-xs font-bold uppercase tracking-widest text-primary hover:text-primary-hover flex items-center transition-colors"
              >
                View All ({wishlist.length})
                <ChevronRight size={14} className="ml-1" />
              </Link>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-xs text-zinc-400 italic py-4 text-center">
                Your wishlist is currently empty.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wishlist.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="group border border-zinc-100 rounded-lg p-3 bg-zinc-50/50 hover:bg-white hover:border-zinc-200 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square bg-zinc-100 overflow-hidden mb-2 rounded">
                        <img
                          src={
                            item.image ||
                            `http://localhost:4000/api/v1/product/product-photo/${item._id}`
                          }
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-xs font-semibold text-zinc-900 truncate mb-1">
                        {item.name}
                      </p>
                      <p className="text-xs font-serif text-zinc-700 font-bold mb-3">
                        ₹{item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleQuickAddToCart(item)}
                      className="w-full py-1.5 bg-black text-white text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Membership Tier */}
          <div className="bg-linear-to-br from-zinc-900 to-zinc-800 text-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                {profile.memberTier}
              </span>
              <Award size={20} className="text-amber-300" />
            </div>
            <h3 className="text-xl font-serif mb-1">{profile.name}</h3>
            <p className="text-xs text-zinc-400 mb-6">
              Member since {profile.memberSince}
            </p>

            <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400">Reward Points:</span>
                <span className="font-bold text-white">
                  {profile.rewardPoints} pts
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Store Credit:</span>
                <span className="font-bold text-emerald-400">
                  ₹{profile.storeCredit.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Tier Status:</span>
                <span className="font-bold text-amber-300">Top 5% VIP</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-zinc-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                  Shipping Address
                </h3>
              </div>
              <Link
                to="/dashboard/user/profile"
                className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Edit
              </Link>
            </div>
            <p className="text-sm font-medium text-zinc-900 mb-1">
              {profile.name}
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {profile.address.street}
              <br />
              {profile.address.city}, {profile.address.state}{" "}
              {profile.address.zip}
              <br />
              {profile.address.country}
            </p>
            <p className="text-xs text-zinc-400 mt-2 font-mono">
              {profile.phone}
            </p>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <CreditCard size={16} className="text-zinc-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                  Payment Method
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Default
              </span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-100 rounded">
              <div className="w-8 h-5 bg-zinc-800 text-white rounded text-[8px] font-bold flex items-center justify-center tracking-tighter">
                VISA
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-900">
                  Visa ending in •••• 4242
                </p>
                <p className="text-[10px] text-zinc-400">Expires 08/29</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
