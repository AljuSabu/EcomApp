import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ShoppingBag, Users, IndianRupee, Layers } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { name: "Active Users", value: "1,240", icon: Users },
    { name: "Total Products", value: "342", icon: Layers },
    { name: "Orders", value: "890", icon: ShoppingBag },
    { name: "Revenue", value: "₹ 1.2L", icon: IndianRupee },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-serif mb-2">Dashboard Overview</h1>
        <p className="text-zinc-500">
          Welcome back, here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-5 w-65 border border-zinc-200 shadow-md shadow-zinc-500/30"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-zinc-50 rounded-lg text-primary">
                <stat.icon size={20} />
              </div>
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
              {stat.name}
            </h3>
            <p className="text-2xl font-serif text-zinc-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-5 border border-zinc-200 shadow-md shadow-zinc-500/30 h-80 text-zinc-400">
          <h3 className="font-black text-lg pb-5">Recent Orders</h3>
          <div className="grid grid-rows-4 gap-2">
            <span className="p-3 rounded-md flex justify-between bg-olive-300/70">
              <p>Order #1023</p>
              <p className="text-sm text-green-400 font-bold">Completed</p>
            </span>
            <span className="p-3 rounded-md flex justify-between bg-olive-300/70">
              <p>Order #1023</p>
              <p className="text-sm text-yellow-400 font-bold">Pending</p>
            </span>
            <span className="p-3 rounded-md flex justify-between bg-olive-300/70">
              <p>Order #1023</p>
              <p className="text-sm text-green-400 font-bold">Completed</p>
            </span>
            <span className="p-3 rounded-md flex justify-between bg-olive-300/70">
              <p>Order #1023</p>
              <p className="text-sm text-red-400 font-bold">Rejected</p>
            </span>
          </div>
        </div>
        <div className="bg-white p-6 border border-zinc-200 shadow-md shadow-zinc-500/30 h-80 text-zinc-400">
          <h3 className="font-black text-lg pb-5">Quick Actions</h3>
          <div className="grid grid-rows-4 gap-2 text-lg">
            <span className="p-5 rounded-md flex justify-center bg-olive-300/70">
              + Add Products
            </span>
            <span className="p-5 rounded-md flex justify-center bg-olive-300/70">
              Manage Users
            </span>
            <span className="p-5 rounded-md flex justify-center bg-olive-300/70">
              View Orders
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
