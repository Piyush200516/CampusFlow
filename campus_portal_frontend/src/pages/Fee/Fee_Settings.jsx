import { useState } from "react";
import { User, Lock, Bell, Moon, Sun, Save, Mail, Phone } from "lucide-react";
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
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Settings
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Manage your account and preferences
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Profile Settings */}
        <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}>
              <User className="text-blue-600" size={24} />
            </div>
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Profile Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <User size={14} className="inline mr-1" /> Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Mail size={14} className="inline mr-1" /> Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Phone size={14} className="inline mr-1" /> Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Appearance */}
        <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-purple-100"}`}>
              {isDarkMode ? <Moon className="text-purple-400" size={24} /> : <Sun className="text-purple-600" size={24} />}
            </div>
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Appearance
            </h2>
          </div>

          <div className="space-y-4">
            <div className={`flex items-center justify-between p-5 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>Dark Mode</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Switch between light and dark theme</p>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-600 hover:bg-gray-500 text-yellow-400" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                {isDarkMode ? <Moon size={22} /> : <Sun size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-green-100"}`}>
              <Bell className="text-green-600" size={24} />
            </div>
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>Email Notifications</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Receive updates via email</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  notifications.email ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  notifications.email ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            <div className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>SMS Notifications</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Receive updates via SMS</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  notifications.sms ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  notifications.sms ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            <div className={`flex items-center justify-between p-4 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <div>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>Fee Alerts</p>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Get notified about fee updates</p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, feeAlerts: !notifications.feeAlerts })}
                className={`w-12 h-6 rounded-full transition-colors duration-300 ${
                  notifications.feeAlerts ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  notifications.feeAlerts ? "translate-x-6" : "translate-x-0.5"
                }`} />
              </button>
            </div>
            <button
              onClick={handleSaveNotifications}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
            >
              <Save size={18} />
              Save Preferences
            </button>
          </div>
        </div>

        {/* Security */}
        <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-red-100"}`}>
              <Lock className="text-red-600" size={24} />
            </div>
            <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium">
              <Lock size={18} />
              Change Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

