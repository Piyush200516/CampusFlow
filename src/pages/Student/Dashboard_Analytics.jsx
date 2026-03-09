import { useDarkMode } from "../../context/DarkModeContext";
import { FaUserGraduate, FaBriefcase, FaFileAlt, FaClock, FaTimes } from "react-icons/fa";
import { GraduationCap, DollarSign, Briefcase, FileText, CheckCircle, AlertCircle } from "lucide-react";

export default function Dashboard_Analytics() {
  const { isDarkMode } = useDarkMode();

  const attendance = 82;

  const semesterFees = [
    { sem: 1, amount: 30000, status: "Paid" },
    { sem: 2, amount: 30000, status: "Paid" },
    { sem: 3, amount: 30000, status: "Pending" },
    { sem: 4, amount: 30000, status: "Pending" },
  ];

  const totalFees = semesterFees.reduce((sum, s) => sum + s.amount, 0);
  const paidFees = semesterFees.filter((s) => s.status === "Paid").reduce((sum, s) => sum + s.amount, 0);
  const feePercent = Math.round((paidFees / totalFees) * 100);

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Student Analytics Dashboard
        </h1>
        <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Track your academic progress and fee status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <div className={`p-5 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <FaUserGraduate className={isDarkMode ? "text-blue-400" : "text-blue-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Attendance</h2>
          </div>
          <p className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{attendance}%</p>
          <div className={`w-full h-2 rounded-full mt-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${attendance}%` }}></div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
              <DollarSign className={isDarkMode ? "text-orange-400" : "text-orange-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Total Fees</h2>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>₹{totalFees.toLocaleString()}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{feePercent}% Paid</p>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
              <Briefcase className={isDarkMode ? "text-green-400" : "text-green-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Placement</h2>
          </div>
          <p className={`text-xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>Eligible</p>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Ready for drives</p>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100"}`}>
              <FileText className={isDarkMode ? "text-yellow-400" : "text-yellow-600"} size={20} />
            </div>
            <h2 className={`font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>TC Status</h2>
          </div>
          <p className={`text-xl font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>Pending</p>
          <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Not applied yet</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <GraduationCap className="text-blue-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Attendance Overview</h2>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-40 h-40">
              <div className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-full`}>
                <div className="text-center">
                  <p className={`text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{attendance}%</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Present</p>
                </div>
              </div>
              <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                <path className={isDarkMode ? "text-gray-700" : "text-gray-200"} strokeWidth="3" stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-blue-500" strokeWidth="3" strokeDasharray={`${attendance}, 100`} stroke="currentColor" fill="transparent" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-orange-900/30" : "bg-orange-100"}`}>
              <DollarSign className="text-orange-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Semester Fee Status</h2>
          </div>
          <div className="space-y-3">
            {semesterFees.map((sem) => (
              <div key={sem.sem} className={`flex items-center justify-between p-4 rounded-xl ${sem.status === "Paid" ? isDarkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-100" : isDarkMode ? "bg-red-900/20 border border-red-800" : "bg-red-50 border border-red-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sem.status === "Paid" ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {sem.status === "Paid" ? <CheckCircle className="text-green-500" size={18} /> : <AlertCircle className="text-red-500" size={18} />}
                  </div>
                  <div>
                    <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Semester {sem.sem}</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>₹{sem.amount.toLocaleString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${sem.status === "Paid" ? isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700" : isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-700"}`}>
                  {sem.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
              <Briefcase className="text-green-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>Placement Status</h2>
          </div>
          <div className={`p-4 rounded-xl ${isDarkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-100"}`}>
            <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
              You are <span className="text-green-500 font-bold">eligible</span> for placement drives!
            </p>
            <p className={`mt-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Upcoming Drives: Infosys, TCS, Wipro</p>
          </div>
        </div>

        <div className={`p-6 rounded-2xl shadow-xl ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-yellow-900/30" : "bg-yellow-100"}`}>
              <FileText className="text-yellow-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>TC Application Status</h2>
          </div>
          <ul className="space-y-3">
            <li className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <FaTimes className="text-red-500" />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Applied</span>
            </li>
            <li className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <FaClock className="text-yellow-500" />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Under Review</span>
            </li>
            <li className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <FaTimes className="text-red-500" />
              <span className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Not Approved Yet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

