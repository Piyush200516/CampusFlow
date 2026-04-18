import { useState } from "react";
import { Search, Save, CheckCircle, XCircle, User, DollarSign, Calendar } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function FeeUpdate() {
  const { isDarkMode } = useDarkMode();
  const [scholarNo, setScholarNo] = useState("");
  const [student, setStudent] = useState(null);
  const [updateData, setUpdateData] = useState({
    amount: "",
    dueDate: "",
    notes: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const students = [
    {
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th-A",
      fatherName: "Ramesh Sharma",
      currentFee: 12000,
      status: "Paid",
    },
    {
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th-B",
      fatherName: "Suresh Verma",
      currentFee: 10000,
      status: "Unpaid",
    },
    {
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th-A",
      fatherName: "Ajay Singh",
      currentFee: 15000,
      status: "Paid",
    },
  ];

  const handleSearch = () => {
    const result = students.find((s) => s.scholarNo === scholarNo);
    setStudent(result || null);
    setShowSuccess(false);
  };

  const handleUpdate = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Fee Update
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Update student fee details and due dates
        </p>
      </div>

      {/* Search Section */}
      <div className={`border rounded-xl p-6 shadow-sm mb-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <h2 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Search Student
        </h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
            <input
              type="text"
              placeholder="Enter Scholar Number"
              value={scholarNo}
              onChange={(e) => setScholarNo(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className={`pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
              }`}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Student Details & Update Form */}
      {student && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Student Info */}
          <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              <User className="text-blue-500" size={20} />
              Student Information
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Scholar Number:</span>
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.scholarNo}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Name:</span>
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.name}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Class:</span>
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.class}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Father's Name:</span>
                <span className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.fatherName}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Current Fee:</span>
                <span className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>₹{student.currentFee}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  student.status === "Paid" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {student.status === "Paid" ? <><CheckCircle size={14} className="inline mr-1" /> Paid</> : <><XCircle size={14} className="inline mr-1" /> Unpaid</>}
                </span>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className={`border rounded-xl p-6 shadow-sm transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}>
            <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              <DollarSign className="text-green-500" size={20} />
              Update Fee Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  New Fee Amount (₹)
                </label>
                <input
                  type="number"
                  value={updateData.amount}
                  onChange={(e) => setUpdateData({ ...updateData, amount: e.target.value })}
                  placeholder="Enter amount"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  <Calendar size={14} className="inline mr-1" /> Due Date
                </label>
                <input
                  type="date"
                  value={updateData.dueDate}
                  onChange={(e) => setUpdateData({ ...updateData, dueDate: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                      : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                  }`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Notes
                </label>
                <textarea
                  value={updateData.notes}
                  onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                  placeholder="Add any notes..."
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                    isDarkMode 
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                  }`}
                />
              </div>
              <button
                onClick={handleUpdate}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
              >
                <Save size={20} />
                Update Fee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <CheckCircle size={20} />
          Fee updated successfully!
        </div>
      )}

      {/* No Student Found */}
      {scholarNo && !student && (
        <div className={`border border-red-200 rounded-xl p-4 mt-4 ${isDarkMode ? "bg-red-900/20" : "bg-red-50"}`}>
          <p className="text-red-600 dark:text-red-400">No student found with scholar number: <span className="font-semibold">{scholarNo}</span></p>
        </div>
      )}

    </div>
  );
}

