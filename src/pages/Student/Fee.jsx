import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { CreditCard, DollarSign, CheckCircle, Clock, AlertCircle, ArrowRight, Receipt } from "lucide-react";

export default function FeeStatus() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const [fees] = useState([
    { sem: "Semester 1", amount: 35000, status: "Paid" },
    { sem: "Semester 2", amount: 35000, status: "Paid" },
    { sem: "Semester 3", amount: 37000, status: "Pending" },
    { sem: "Semester 4", amount: 37000, status: "Pending" },
    { sem: "Semester 5", amount: 39000, status: "Upcoming" },
  ]);

  const totalAmount = fees.reduce((sum, f) => sum + f.amount, 0);
  const paidAmount = fees.filter(f => f.status === "Paid").reduce((sum, f) => sum + f.amount, 0);
  const pendingAmount = fees.filter(f => f.status === "Pending").reduce((sum, f) => sum + f.amount, 0);

  const statusConfig = {
    Paid: { 
      color: isDarkMode ? "bg-green-900/30 text-green-400 border-green-700" : "bg-green-100 text-green-700 border-green-300",
      bg: isDarkMode ? "bg-green-900/20" : "bg-green-50",
      icon: CheckCircle 
    },
    Pending: { 
      color: isDarkMode ? "bg-red-900/30 text-red-400 border-red-700" : "bg-red-100 text-red-700 border-red-300",
      bg: isDarkMode ? "bg-red-900/20" : "bg-red-50",
      icon: Clock 
    },
    Upcoming: { 
      color: isDarkMode ? "bg-yellow-900/30 text-yellow-400 border-yellow-700" : "bg-yellow-100 text-yellow-700 border-yellow-300",
      bg: isDarkMode ? "bg-yellow-900/20" : "bg-yellow-50",
      icon: AlertCircle 
    },
  };

  const getStatusBadge = (status) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
        <Icon size={14} />
        {status}
      </span>
    );
  };

  return (
    <div className={`p-4 md:p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Fee Status
        </h1>
        <p className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Track your semester fee payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className={`p-5 rounded-2xl shadow-lg ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-blue-900/30" : "bg-blue-100"}`}>
              <DollarSign className="text-blue-500" size={22} />
            </div>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Total Fee</span>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-800"}`}>₹ {totalAmount.toLocaleString()}</p>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-green-900/30" : "bg-green-100"}`}>
              <CheckCircle className="text-green-500" size={22} />
            </div>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Paid</span>
          </div>
          <p className="text-2xl font-bold text-green-500">₹ {paidAmount.toLocaleString()}</p>
        </div>

        <div className={`p-5 rounded-2xl shadow-lg ${
          isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
        }`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-red-900/30" : "bg-red-100"}`}>
              <Clock className="text-red-500" size={22} />
            </div>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Pending</span>
          </div>
          <p className="text-2xl font-bold text-red-500">₹ {pendingAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Fee Table */}
      <div className={`rounded-2xl shadow-xl overflow-hidden ${isDarkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"}`}>
        <div className={`p-5 border-b ${isDarkMode ? "border-gray-700" : "border-gray-100"}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isDarkMode ? "bg-purple-900/30" : "bg-purple-100"}`}>
              <Receipt className="text-purple-500" size={22} />
            </div>
            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
              Semester Fees
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}>
              <tr>
                <th className={`px-5 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Semester</th>
                <th className={`px-5 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Amount</th>
                <th className={`px-5 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Status</th>
                <th className={`px-5 py-4 text-left text-sm font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {fees.map((f, i) => (
                <tr key={i} className={`border-t transition-colors ${
                  isDarkMode ? "border-gray-700 hover:bg-gray-750" : "border-gray-100 hover:bg-gray-50"
                }`}>
                  <td className={`px-5 py-4 font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{f.sem}</td>
                  <td className={`px-5 py-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>₹ {f.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">{getStatusBadge(f.status)}</td>
                  <td className="px-5 py-4">
                    {f.status === "Pending" && (
                      <button
onClick={() => navigate("/fee/student-fees")}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
                      >
                        Pay Now
                        <ArrowRight size={16} />
                      </button>
                    )}
                    {f.status === "Paid" && (
                      <span className={`flex items-center gap-2 font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                        <CheckCircle size={18} />
                        Completed
                      </span>
                    )}
                    {f.status === "Upcoming" && (
                      <span className={isDarkMode ? "text-gray-500" : "text-gray-400"}>
                        Not Open
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

