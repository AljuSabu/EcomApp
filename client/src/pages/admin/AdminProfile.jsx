// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Camera, Mail, MapPin, Shield } from 'lucide-react';

const AdminProfile = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-serif mb-2">Admin Profile</h1>
          <p className="text-zinc-500">
            Manage your personal information and security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 border border-zinc-200 shadow-sm text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-zinc-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                  <img
                    src="https://picsum.photos/seed/admin/200/200"
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-serif mb-1">John Doe</h2>
              <p className="text-sm text-zinc-500 mb-6">Super Administrator</p>
              <div className="flex justify-center space-x-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Admin
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white border border-zinc-200 shadow-sm divide-y divide-zinc-100">
              <div className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  Account Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400">
                      Full Name
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-100 text-sm">
                      <Shield size={16} className="text-zinc-400" />
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-100 text-sm">
                      <Mail size={16} className="text-zinc-400" />
                      <span>admin@luxe.com</span>
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-bold text-zinc-400">
                      Location
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-zinc-50 border border-zinc-100 text-sm">
                      <MapPin size={16} className="text-zinc-400" />
                      <span>New York, USA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  Security
                </h3>
                <button className="px-6 py-2 border border-zinc-200 text-xs font-bold uppercase tracking-widest hover:bg-zinc-50 transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminProfile;
