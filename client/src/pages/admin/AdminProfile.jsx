import { useContext, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Camera,
  Mail,
  MapPin,
  Shield,
  Lock,
  Check,
  AlertCircle,
} from "lucide-react";
import AuthContext from "../../context/AuthContext";

const AdminProfile = () => {
  const { auth } = useContext(AuthContext);

  const profile = {
    name: auth?.user?.name || "Admin",
    email: auth?.user?.email || "—",
    role: auth?.user?.role || "Administrator",
    location: auth?.user?.location || "Not set",
    avatar:
      auth?.user?.avatar ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        auth?.user?.name || "Admin",
      )}&background=18181b&color=fff&size=200`,
  };

  // Password change state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    if (!passwords.current || !passwords.new) {
      setPasswordError("Please fill in all password fields.");
      return;
    }
    if (passwords.new.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulated request delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      setPasswordSuccess(true);
      setPasswords({ current: "", new: "", confirm: "" });
      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (error) {
      console.log(error);
      setPasswordError("Something went wrong while changing your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-serif mb-2">Admin Profile</h1>
        <p className="text-zinc-500 text-sm">
          Manage your personal information and security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-xl border border-zinc-100 shadow-sm text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-zinc-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                title="Change Photo"
                type="button"
                className="absolute bottom-0 right-0 p-2 bg-zinc-900 text-white rounded-full shadow-lg hover:bg-zinc-800 transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-serif mb-1 text-zinc-900">
              {profile.name}
            </h2>
            <p className="text-sm text-zinc-500 mb-6">{profile.role}</p>
            <div className="flex justify-center space-x-2">
              <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Admin
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Account Details + Security */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">
              Account Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400">
                  Full Name
                </label>
                <div className="flex items-center space-x-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100 text-sm text-zinc-900">
                  <Shield size={16} className="text-zinc-400" />
                  <span>{profile.name}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400">
                  Email Address
                </label>
                <div className="flex items-center space-x-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100 text-sm text-zinc-900">
                  <Mail size={16} className="text-zinc-400" />
                  <span>{profile.email}</span>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold text-zinc-400">
                  Location
                </label>
                <div className="flex items-center space-x-3 p-3 bg-zinc-50 rounded-lg border border-zinc-100 text-sm text-zinc-900">
                  <MapPin size={16} className="text-zinc-400" />
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-2 flex items-center">
              <Lock size={16} className="mr-2 text-zinc-400" />
              Change Password
            </h3>
            <p className="text-xs text-zinc-500 mb-6">
              Ensure your admin account is protected with a strong, secure
              passphrase.
            </p>

            {passwordError && (
              <div className="p-3 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs font-medium flex items-center space-x-2">
                <AlertCircle size={15} />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 mb-6 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium flex items-center space-x-2">
                <Check size={15} />
                <span>Your password has been changed successfully.</span>
              </div>
            )}

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-4 max-w-md"
            >
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords({ ...passwords, current: e.target.value })
                  }
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm outline-none focus:border-zinc-900 text-zinc-900"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwords.new}
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm outline-none focus:border-zinc-900 text-zinc-900"
                  placeholder="At least 6 characters"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                  className="w-full border border-zinc-200 rounded-lg p-3 text-sm outline-none focus:border-zinc-900 text-zinc-900"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 px-6 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors disabled:bg-zinc-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminProfile;
