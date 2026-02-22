import { useState } from "react";
import { User, Lock, Bell, Moon, Sun, Save } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function FeeSettings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [profile, setProfile] = useState({
    name: "Fee Admin",
    email: "fee@acropolis.edu",
    phone: "9876543210",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    feeAlerts: true,
    tcUpdates: true,
  });

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    alert("Notification preferences saved!");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Profile Settings */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <User className="text-blue-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Profile Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg">
              {isDarkMode ? <Moon className="text-purple-600" size={24} /> : <Sun className="text-purple-600" size={24} />}
            </div>
            <h2 className="text-xl font-semibold">Appearance</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Switch between light and dark theme</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "bg-gray-700 text-yellow-400" : "bg-gray-200 text-gray-700"
                }`}
              >
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-lg">
              <Bell className="text-green-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.email ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  notifications.email ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via SMS</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.sms ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  notifications.sms ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Fee Alerts</p>
                <p className="text-sm text-gray-500">Get notified about fee updates</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, feeAlerts: !notifications.feeAlerts })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.feeAlerts ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  notifications.feeAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            <button
              onClick={handleSaveNotifications}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              <Save size={18} />
              Save Preferences
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-lg">
              <Lock className="text-red-600" size={24} />
            </div>
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
