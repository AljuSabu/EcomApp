import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Bell,
  Camera,
  Check,
  ShieldCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { userProfileData } from '../../data/data';

const UserProfile = () => {
  const [profile, setProfile] = useState(userProfileData[0]);
  const updateProfile = (updated) => setProfile(updated);
  const [formData, setFormData] = useState(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Password fields state
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [field]: value,
      },
    }));
  };

  const handlePreferenceToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (!passwords.current || !passwords.new) {
      setPasswordError('Please fill in all password fields.');
      return;
    }

    if (passwords.new.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (passwords.new !== passwords.confirm) {
      setPasswordError('Passwords do not match.');
      return;
    }

    setPasswordSuccess(true);
    setPasswords({ current: '', new: '', confirm: '' });
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif mb-2">My Profile & Account</h1>
        <p className="text-zinc-500 text-sm">
          Manage your personal information, delivery addresses, and account security.
        </p>
      </div>

      {savedSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Check size={16} className="text-emerald-600" />
            <span>Your profile details have been successfully updated!</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 border border-zinc-200 shadow-xs text-center">
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-full bg-zinc-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden mx-auto">
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                title="Change Photo"
                type="button"
                className="absolute bottom-0 right-0 p-2.5 bg-indigo-800 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
              >
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-xl font-serif mb-1 text-zinc-900">{formData.name}</h2>
            <p className="text-xs text-zinc-500 mb-4">{formData.email}</p>

            <div className="flex justify-center items-center space-x-2 mb-6">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/60 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center">
                <Sparkles size={10} className="mr-1" />
                {formData.memberTier}
              </span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Verified
              </span>
            </div>

            <div className="border-t border-zinc-100 pt-6 text-left space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Member Since:</span>
                <span className="text-zinc-800 font-semibold">{formData.memberSince}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Luxe Reward Pts:</span>
                <span className="text-zinc-800 font-semibold">{formData.rewardPoints} Pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400 font-medium">Store Credit:</span>
                <span className="text-emerald-700 font-semibold">${formData.storeCredit.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Tabs on Left */}
          <div className="bg-white border border-zinc-200 shadow-xs p-2 space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'general' ? 'bg-indigo-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <User size={16} />
              <span>Personal Details</span>
            </button>
            <button
              onClick={() => setActiveTab('address')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'address' ? 'bg-indigo-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <MapPin size={16} />
              <span>Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'security' ? 'bg-indigo-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Lock size={16} />
              <span>Password & Security</span>
            </button>
            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-xs font-bold uppercase tracking-wider text-left transition-colors ${
                activeTab === 'preferences' ? 'bg-indigo-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              <Bell size={16} />
              <span>Preferences</span>
            </button>
          </div>
        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-2">
          {/* TAB 1: GENERAL INFORMATION */}
          {activeTab === 'general' && (
            <div className="bg-white border border-zinc-200 shadow-xs p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6 flex items-center">
                <User size={18} className="mr-2 text-zinc-400" />
                Personal Information
              </h3>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Full Name
                    </label>
                    <div className="flex items-center border border-zinc-200 px-3 py-2.5 focus-within:border-indigo-900">
                      <User size={16} className="text-zinc-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full text-sm outline-none bg-transparent text-zinc-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Email Address
                    </label>
                    <div className="flex items-center border border-zinc-200 px-3 py-2.5 focus-within:border-indigo-900">
                      <Mail size={16} className="text-zinc-400 mr-2 shrink-0" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full text-sm outline-none bg-transparent text-zinc-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Phone Number
                    </label>
                    <div className="flex items-center border border-zinc-200 px-3 py-2.5 focus-within:border-indigo-900">
                      <Phone size={16} className="text-zinc-400 mr-2 shrink-0" />
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-sm outline-none bg-transparent text-zinc-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Preferred Currency
                    </label>
                    <select
                      value={formData.preferences.currency}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferences: { ...prev.preferences, currency: e.target.value },
                        }))
                      }
                      className="w-full border border-zinc-200 px-3 py-2.5 text-sm bg-white outline-none focus:border-indigo-900 text-zinc-900"
                    >
                      <option value="USD ($)">USD ($) - US Dollar</option>
                      <option value="EUR (€)">EUR (€) - Euro</option>
                      <option value="GBP (£)">GBP (£) - British Pound</option>
                      <option value="JPY (¥)">JPY (¥) - Japanese Yen</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-indigo-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-md shadow-indigo-900/20"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: ADDRESSES */}
          {activeTab === 'address' && (
            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white border border-zinc-200 shadow-xs p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6 flex items-center">
                  <MapPin size={18} className="mr-2 text-zinc-400" />
                  Primary Shipping Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Street Address & Apt
                    </label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => handleAddressChange('address', 'street', e.target.value)}
                      className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-idigo-900 text-zinc-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => handleAddressChange('address', 'city', e.target.value)}
                        className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-idigo-900 text-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                        State / Province
                      </label>
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) => handleAddressChange('address', 'state', e.target.value)}
                        className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-idigo-900 text-zinc-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.address.zip}
                        onChange={(e) => handleAddressChange('address', 'zip', e.target.value)}
                        className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-idigo-900 text-zinc-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.address.country}
                      onChange={(e) => handleAddressChange('address', 'country', e.target.value)}
                      className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-idigo-900 text-zinc-900"
                    />
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-zinc-100 flex justify-end">
                  <button
                    onClick={handleSaveProfile}
                    className="px-8 py-3.5 bg-idigo-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-idigo-800 transition-all shadow-md shadow-idigo-900/20"
                  >
                    Save Address
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY */}
          {activeTab === 'security' && (
            <div className="bg-white border border-zinc-200 shadow-xs p-8 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-2 flex items-center">
                  <Lock size={18} className="mr-2 text-zinc-400" />
                  Change Password
                </h3>
                <p className="text-xs text-zinc-500 mb-6">
                  Ensure your account is protected with a strong, secure passphrase.
                </p>

                {passwordError && (
                  <div className="p-3 mb-6 bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2">
                    <AlertCircle size={15} />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3 mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center space-x-2">
                    <Check size={15} />
                    <span>Your password has been changed successfully.</span>
                  </div>
                )}

                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 block">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-indigo-900 text-zinc-900"
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
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-indigo-900 text-zinc-900"
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
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="w-full border border-zinc-200 p-3 text-sm outline-none focus:border-indigo-900 text-zinc-900"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 px-6 py-3 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Two Factor Authentication Banner */}
              <div className="pt-6 border-t border-zinc-100">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck size={18} className="text-emerald-600" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                        Two-Factor Authentication (2FA)
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 max-w-md">
                      Add an extra layer of security to your luxury commerce account.
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider rounded-full border border-emerald-200/50">
                    Active
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="bg-white border border-zinc-200 shadow-xs p-8 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-6 flex items-center">
                <Bell size={18} className="mr-2 text-zinc-400" />
                Notification & Communication Preferences
              </h3>

              <div className="space-y-6 divide-y divide-zinc-100">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Exclusive VIP Drops & Editorial Newsletters</p>
                    <p className="text-xs text-zinc-500">Receive private collection launches and seasonal curation previews.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePreferenceToggle('newsletter')}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      formData.preferences.newsletter ? 'bg-indigo-900' : 'bg-zinc-200'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full transition-transform transform absolute top-1 ${
                        formData.preferences.newsletter ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Live SMS Order Tracking & Delivery Alerts</p>
                    <p className="text-xs text-zinc-500">Receive real-time courier updates directly to {formData.phone}.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handlePreferenceToggle('smsAlerts')}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      formData.preferences.smsAlerts ? 'bg-indigo-900' : 'bg-zinc-200'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 bg-white rounded-full transition-transform transform absolute top-1 ${
                        formData.preferences.smsAlerts ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  className="px-8 py-3.5 bg-indigo-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-800 transition-all shadow-md shadow-indigo-900/20"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;