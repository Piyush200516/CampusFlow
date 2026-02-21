import { CheckCircle, Download, Clock, Briefcase, Building2, X } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function StudentDashboard() {
  const { darkMode } = useDarkMode();

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${
      darkMode ? "bg-neutral-900" : "bg-gray-50"
    }`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>Student Dashboard</h1>
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Manage your placement activities and profile.</p>
      </div>

      {/* New Update Banner */}
      <div className={`border rounded-xl p-4 mb-6 shadow-sm flex justify-between items-start transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div>
          <h2 className={`font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>✨ New Update!</h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            The Certificates section is now unlocked! It no longer requires CAF approval to access.
          </p>
        </div>
        <X className={darkMode ? "text-gray-400 cursor-pointer" : "text-gray-400 cursor-pointer"} />
      </div>

      {/* CAF Approved Section */}
      <div className={`border-l-4 border-green-600 rounded-xl p-6 mb-8 shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-green-50"
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>CAF Form Approved</h2>
          <span className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
            <CheckCircle size={16} /> Approved
          </span>
        </div>

        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Congratulations! Your CAF form has been approved. You now have access to all placement features.
        </p>

        <button className={`flex items-center gap-2 border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-300 ${
          darkMode ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-100"
        }`}>
          <Download size={18} />
          Download Resume Format
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Attendance Card */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Attendance</h3>
            <Clock className={darkMode ? "text-gray-400" : "text-gray-500"} />
          </div>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Mark your attendance for active sessions.
          </p>
          <button className={`w-full py-2 rounded-lg transition-colors duration-300 ${
            darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}>
            Access
          </button>
        </div>

        {/* Internships Card */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Internships</h3>
            <Briefcase className={darkMode ? "text-gray-400" : "text-gray-500"} />
          </div>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Manage your internship records and PPO details.
          </p>
          <button className={`w-full py-2 rounded-lg transition-colors duration-300 ${
            darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}>
            Access
          </button>
        </div>

        {/* Placement Drives Card */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Placement Drives</h3>
            <Building2 className={darkMode ? "text-gray-400" : "text-gray-500"} />
          </div>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            View and apply for eligible placement drives.
          </p>
          <button className={`w-full py-2 rounded-lg transition-colors duration-300 ${
            darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}>
            Access
          </button>
        </div>

      </div>
    </div>
  );
}
