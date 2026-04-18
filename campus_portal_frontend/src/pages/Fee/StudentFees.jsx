import { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle, XCircle, DollarSign, User } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function StudentFees() {
  const { isDarkMode } = useDarkMode();
  const [students, setStudents] = useState([
    {
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th-A",
      phone: "9876543210",
      email: "rahul@email.com",
      feeStatus: "Paid",
      paidOn: "10-Apr-2024",
      amount: "12000",
      method: "Online",
      mode: "Regular",
    },
    {
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th-B",
      phone: "9123456780",
      email: "anjali@email.com",
      feeStatus: "Unpaid",
      paidOn: "-",
      amount: "10000",
      method: "-",
      mode: "Regular",
    },
    {
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th-A",
      phone: "9988776655",
      email: "priya@email.com",
      feeStatus: "Paid",
      paidOn: "15-Apr-2024",
      amount: "15000",
      method: "Cash",
      mode: "Regular",
    },
    {
      scholarNo: "AITR460825",
      name: "Amit Kumar",
      class: "12th-A",
      phone: "9876543211",
      email: "amit@email.com",
      feeStatus: "Partial",
      paidOn: "20-Apr-2024",
      amount: "8000",
      method: "Online",
      mode: "Regular",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.scholarNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || student.feeStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Unpaid":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Partial":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Student Fees Management
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          View and manage all student fee records
        </p>
      </div>

      {/* Search and Filter */}
      <div className={`border rounded-xl p-4 shadow-sm mb-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
              <input
                type="text"
                placeholder="Search by name or scholar number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className={isDarkMode ? "text-gray-400" : "text-gray-500"} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`py-2.5 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-400"
                }`}
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className={`border rounded-xl shadow-sm overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}>
              <tr>
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
                  Phone
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Fee Amount
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Status
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Paid On
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Method
                </th>
                <th className={`text-left py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className={`border-b hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                }`}>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.scholarNo}
                  </td>
                  <td className={`py-3 px-4 font-medium transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {student.name}
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.class}
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.phone}
                  </td>
                  <td className={`py-3 px-4 font-semibold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    ₹{student.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${getStatusColor(student.feeStatus)}`}>
                      {student.feeStatus === "Paid" && <CheckCircle size={14} />}
                      {student.feeStatus === "Unpaid" && <XCircle size={14} />}
                      {student.feeStatus === "Partial" && <DollarSign size={14} />}
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {student.paidOn}
                  </td>
                  <td className={`py-3 px-4 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {student.method}
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors duration-300">
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}>
              <User className="text-blue-600" size={24} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Total Students</p>
              <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>{students.length}</p>
            </div>
          </div>
        </div>
        <div className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Paid</p>
              <p className="text-2xl font-bold text-green-600">{students.filter(s => s.feeStatus === "Paid").length}</p>
            </div>
          </div>
        </div>
        <div className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-red-100">
              <XCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Unpaid</p>
              <p className="text-2xl font-bold text-red-600">{students.filter(s => s.feeStatus === "Unpaid").length}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

