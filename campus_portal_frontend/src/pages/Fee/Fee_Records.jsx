import { useState } from "react";
import { Search, FileText, CheckCircle, XCircle, DollarSign, Phone, Mail, User, Calendar } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function FeeRecords() {
  const { isDarkMode } = useDarkMode();
  const [scholar, setScholar] = useState("");
  const [student, setStudent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Dummy database
  const students = [
    {
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th-A",
      phone: "9876543210",
      email: "rahul@email.com",
      fatherName: "Ramesh Sharma",
      feeStatus: "Paid",
      paidOn: "10-Apr-2024",
      amount: "12000",
      method: "Online",
      dueDate: "31-Mar-2024",
    },
    {
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th-B",
      phone: "9123456780",
      email: "anjali@email.com",
      fatherName: "Suresh Verma",
      feeStatus: "Unpaid",
      dueDate: "31-Mar-2024",
    },
    {
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th-A",
      phone: "9988776655",
      email: "priya@email.com",
      fatherName: "Ajay Singh",
      feeStatus: "Paid",
      paidOn: "15-Apr-2024",
      amount: "15000",
      method: "Cash",
      dueDate: "31-Mar-2024",
    },
  ];

  const handleSearch = () => {
    const result = students.find((s) => s.scholarNo === scholar);
    setStudent(result || null);
  };

  const recordPayment = () => {
    setStudent({
      ...student,
      feeStatus: "Paid",
      paidOn: new Date().toLocaleDateString("en-GB"),
      amount: "12000",
      method: "Cash",
    });
    setShowPaymentModal(false);
  };

  const getStatusBadge = (status) => {
    if (status === "Paid") {
      return (
        <span className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
          <CheckCircle size={16} /> Paid
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
        <XCircle size={16} /> Unpaid
      </span>
    );
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          Fee Records
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Search and manage student fee records
        </p>
      </div>

      {/* Search Section */}
      <div className={`border rounded-xl p-6 shadow-sm mb-6 transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Enter Scholar Number
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
              <input
                type="text"
                placeholder="e.g., AITR040613"
                value={scholar}
                onChange={(e) => setScholar(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                    : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
                }`}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center gap-2"
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      {/* Student Card */}
      {student && (
        <div className={`border rounded-xl shadow-sm transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          {/* Card Header */}
          <div className={`p-6 border-b transition-colors duration-300 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full ${isDarkMode ? "bg-gray-700" : "bg-blue-100"}`}>
                  <User className="text-blue-600" size={32} />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {student.name}
                  </h2>
                  <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Scholar No: <span className="font-semibold">{student.scholarNo}</span>
                  </p>
                </div>
              </div>
              {getStatusBadge(student.feeStatus)}
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Student Info */}
              <div className={`p-5 rounded-xl transition-colors duration-300 ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  <User size={20} className="text-blue-500" />
                  Student Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Class:</span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Father's Name:</span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <Phone size={14} /> Phone:
                    </span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <Mail size={14} /> Email:
                    </span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.email}</span>
                  </div>
                </div>
              </div>

              {/* Fee Details */}
              <div className={`p-5 rounded-xl transition-colors duration-300 ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                <h3 className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  <DollarSign size={20} className="text-green-500" />
                  Fee Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Due Date:</span>
                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.dueDate}</span>
                  </div>
                  
                  {student.feeStatus === "Paid" ? (
                    <>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Amount Paid:</span>
                        <span className="font-bold text-green-600">₹{student.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={`flex items-center gap-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                          <Calendar size={14} /> Paid On:
                        </span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.paidOn}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Payment Method:</span>
                        <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>{student.method}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between">
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Pending Amount:</span>
                      <span className="font-bold text-red-600">₹12,000</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            {student.feeStatus === "Unpaid" && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
                >
                  <DollarSign size={20} />
                  Record Payment
                </button>
              </div>
            )}

            {student.feeStatus === "Paid" && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center justify-center gap-2">
                  <FileText size={20} />
                  Download Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Student Found */}
      {scholar && !student && (
        <div className={`border rounded-xl p-8 text-center transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
            <Search className={isDarkMode ? "text-gray-400" : "text-gray-400"} size={32} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            No Student Found
          </h3>
          <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            No student found with scholar number: <span className="font-semibold">{scholar}</span>
          </p>
        </div>
      )}

      {/* Initial State */}
      {!scholar && !student && (
        <div className={`border rounded-xl p-12 text-center transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? "bg-gray-700" : "bg-blue-50"}`}>
            <FileText className="text-blue-500" size={40} />
          </div>
          <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
            Search Student Fee Record
          </h3>
          <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            Enter the scholar number above to view fee details and payment status
          </p>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`border rounded-2xl p-6 w-full max-w-md shadow-2xl transition-colors duration-300 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-green-600" size={32} />
              </div>
              <h3 className={`text-2xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                Record Payment
              </h3>
              <p className={`mt-2 transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                {student?.name} - Scholar No: {student?.scholarNo}
              </p>
            </div>
            
            <div className={`p-4 rounded-lg mb-6 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Amount to Pay:</span>
                <span className="text-2xl font-bold text-green-600">₹12,000</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={recordPayment}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

