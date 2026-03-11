import { useNavigate } from "react-router-dom";
import { Users, BookOpen, ClipboardCheck, FileText, CheckCircle, XCircle, Clock, GraduationCap, TrendingUp, ArrowRight } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function DepartmentDashboard() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Department Dashboard
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Manage students, attendance, and academic records.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {/* Total Students */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
          isDarkMode ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-blue-900/20" : "bg-white border-gray-200 hover:shadow-lg"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Total Students
            </h3>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={22} />
            </div>
          </div>
          <p className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-blue-600"}`}>
            450
          </p>
          <div className="flex items-center gap-1 mt-2 text-green-600 text-sm">
            <TrendingUp size={14} />
            <span>+15 this month</span>
          </div>
        </div>

        {/* Classes */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
          isDarkMode ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-green-900/20" : "bg-white border-gray-200 hover:shadow-lg"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Classes
            </h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="text-green-600" size={22} />
            </div>
          </div>
          <p className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-green-600"}`}>
            12
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Active classes
          </p>
        </div>

        {/* Attendance */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
          isDarkMode ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-orange-900/20" : "bg-white border-gray-200 hover:shadow-lg"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Attendance
            </h3>
            <div className="p-2 bg-orange-100 rounded-lg">
              <ClipboardCheck className="text-orange-600" size={22} />
            </div>
          </div>
          <p className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-orange-600"}`}>
            92%
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Average attendance
          </p>
        </div>

        {/* Pending Forms */}
        <div className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${
          isDarkMode ? "bg-gray-800 border-gray-700 hover:shadow-lg hover:shadow-purple-900/20" : "bg-white border-gray-200 hover:shadow-lg"
        }`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Pending Forms
            </h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="text-purple-600" size={22} />
            </div>
          </div>
          <p className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-purple-600"}`}>
            15
          </p>
          <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Awaiting verification
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className={`border rounded-xl p-6 shadow-sm mb-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <h2 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => navigate("/department/student-list")}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            <Users size={18} />
            Student List
          </button>
          <button 
            onClick={() => navigate("/department/attendance-update")}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
          >
            <ClipboardCheck size={18} />
            Update Attendance
          </button>
          <button 
            onClick={() => navigate("/department/verify-forms")}
            className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium"
          >
            <FileText size={18} />
            Verify Forms
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Recent Student Activity
          </h2>
          <button 
            onClick={() => navigate("/department/student-list")}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-300"
          >
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Scholar No.
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Student Name
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Class
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Activity
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  AITR040613
                </td>
                <td className={`py-3 px-4 font-medium transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Rahul Sharma
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  10th-A
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  TC Application
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium w-fit">
                    <CheckCircle size={14} /> Verified
                  </span>
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  10-Apr-2024
                </td>
              </tr>
              <tr className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  AITR240613
                </td>
                <td className={`py-3 px-4 font-medium transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Anjali Verma
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  9th-B
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Attendance Update
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium w-fit">
                    <Clock size={14} /> Updated
                  </span>
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  09-Apr-2024
                </td>
              </tr>
              <tr className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                isDarkMode ? "border-gray-700" : "border-gray-100"
              }`}>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  AITR350714
                </td>
                <td className={`py-3 px-4 font-medium transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  Priya Singh
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  11th-A
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Bonafide Certificate
                </td>
                <td className="py-3 px-4">
                  <span className="flex items-center gap-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-medium w-fit">
                    <Clock size={14} /> Pending
                  </span>
                </td>
                <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  08-Apr-2024
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

