import { CheckCircle, Download, Clock, Briefcase, Building2, X } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <p className="text-gray-500">Manage your placement activities and profile.</p>
      </div>

      {/* New Update Banner */}
      <div className="bg-white border rounded-xl p-4 mb-6 shadow-sm flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg">✨ New Update!</h2>
          <p className="text-gray-500 text-sm">
            The Certificates section is now unlocked! It no longer requires CAF approval to access.
          </p>
        </div>
        <X className="text-gray-400 cursor-pointer" />
      </div>

      {/* CAF Approved Section */}
      <div className="bg-green-50 border-l-4 border-green-600 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-xl font-semibold">CAF Form Approved</h2>
          <span className="flex items-center gap-1 bg-green-600 text-white text-sm px-3 py-1 rounded-full">
            <CheckCircle size={16} /> Approved
          </span>
        </div>

        <p className="text-gray-600 mb-4">
          Congratulations! Your CAF form has been approved. You now have access to all placement features.
        </p>

        <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100">
          <Download size={18} />
          Download Resume Format
        </button>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Attendance Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <Clock className="text-gray-500" />
          </div>
          <p className="text-gray-500 mb-4">
            Mark your attendance for active sessions.
          </p>
          <button className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
            Access
          </button>
        </div>

        {/* Internships Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Internships</h3>
            <Briefcase className="text-gray-500" />
          </div>
          <p className="text-gray-500 mb-4">
            Manage your internship records and PPO details.
          </p>
          <button className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
            Access
          </button>
        </div>

        {/* Placement Drives Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Placement Drives</h3>
            <Building2 className="text-gray-500" />
          </div>
          <p className="text-gray-500 mb-4">
            View and apply for eligible placement drives.
          </p>
          <button className="w-full bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
            Access
          </button>
        </div>

      </div>
    </div>
  );
}
