import React, { useEffect, useState } from "react";
import LeftSidebar from '../components/LeftSidebar';
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/");
    }
  }, [nav]);

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  const handleToggleNotification = (type) =>
    setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#181D14]">
      <LeftSidebar />

      <div className="flex-1 w-full p-4 sm:p-6 md:p-10 text-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold">Settings</h1>
        </div>

        {/* Profile Settings */}
        <div className="bg-[#242e24] rounded-xl p-4 sm:p-5 mb-6 shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="w-full px-4 py-2 rounded-lg text-white bg-[#181D14] focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 rounded-lg bg-[#181D14] text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-[#242e24] rounded-xl p-4 sm:p-5 mb-6 shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Security</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-[#181D14] text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">New Password</label>
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-2 rounded-lg bg-[#181D14] text-white focus:outline-none"
              />
            </div>
          </div>
          <button className="mt-4 w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
            Update Password
          </button>
        </div>

        {/* Notification Preferences */}
        <div className="bg-[#242e24] rounded-xl p-4 sm:p-5 mb-6 shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Notification Preferences</h2>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() => handleToggleNotification("email")}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              Email Notifications
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() => handleToggleNotification("sms")}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              SMS Notifications
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
