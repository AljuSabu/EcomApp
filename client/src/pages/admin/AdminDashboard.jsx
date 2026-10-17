import { useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  IndianRupee,
  Layers,
  Plus,
  PackageSearch,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import AuthContext from "../../context/AuthContext";
import { userOrder } from "../../data/data";

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const firstName = auth?.user?.name?.split(" ")[0] || "Admin";

  const totalRevenue = userOrder.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    { name: "Active Users", value: "1,240", icon: Users },
    { name: "Total Products", value: "342", icon: Layers },
    { name: "Orders", value: `${userOrder.length}`, icon: ShoppingBag },
    {
      name: "Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
    },
  ];

  const recentOrders = userOrder.slice(0, 4);

  const statusStyle = {
    Delivered: {
      icon: CheckCircle2,
      text: "text-emerald-700",
      badge: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    },
    "In Transit": {
      icon: Clock,
      text: "text-blue-700",
      badge: "bg-blue-50 text-blue-700 border border-blue-200/60",
    },
    Processing: {
      icon: Clock,
      text: "text-amber-700",
      badge: "bg-amber-50 text-amber-700 border border-amber-200/60",
    },
    Cancelled: {
      icon: XCircle,
      text: "text-zinc-600",
      badge: "bg-zinc-100 text-zinc-600 border border-zinc-200",
    },
  };

  const quickActions = [
    {
      name: "Add Product",
      path: "manage-product",
      icon: Plus,
      desc: "Create a new listing",
    },
    {
      name: "Manage Collections",
      path: "manage-collection",
      icon: Layers,
      desc: "Organize categories",
    },
    {
      name: "View Catalog",
      path: "products",
      icon: PackageSearch,
      desc: "See live storefront",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif mb-2">
          Welcome back, {firstName}
        </h1>
        <p className="text-zinc-500 text-xs sm:text-sm">
          Here's what's happening with your store today.
        </p>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-4 sm:p-5 lg:p-6 rounded-xl border border-zinc-100 shadow-sm hover:shadow-xl hover:border-zinc-200 transition-all"
          >
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="p-2.5 bg-zinc-50 rounded-lg text-zinc-900">
                <stat.icon size={20} />
              </div>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
              {stat.name}
            </h3>
            <p className="text-xl sm:text-2xl font-serif text-zinc-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Orders + Quick Actions side by side from xl for the same reason */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 mb-4 sm:mb-5 pb-4 border-b border-zinc-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900">
              Recent Orders
            </h3>
            <Link
              to="manage-product"
              className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 flex items-center transition-colors"
            >
              View All
              <ArrowUpRight size={14} className="ml-1" />
            </Link>
          </div>

          <div className="space-y-2">
            {recentOrders.map((order) => {
              const style = statusStyle[order.status] || statusStyle.Processing;
              const StatusIcon = style.icon;
              return (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-zinc-400">{order.date}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-sm font-serif font-bold text-zinc-900">
                      ₹{order.total.toFixed(2)}
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.badge}`}
                    >
                      <StatusIcon size={11} className="mr-1" />
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4 sm:p-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-4 sm:mb-5 pb-4 border-b border-zinc-100">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.path}
                className="flex items-center justify-between gap-3 p-4 rounded-lg border border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50 transition-all group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="p-2 bg-zinc-900 text-white rounded-lg group-hover:scale-105 transition-transform shrink-0">
                    <action.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900">
                      {action.name}
                    </p>
                    <p className="text-xs text-zinc-400">{action.desc}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-zinc-300 group-hover:text-zinc-600 transition-colors shrink-0"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
