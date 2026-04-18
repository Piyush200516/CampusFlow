import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, FileText, User, Calendar, MessageSquare } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

export default function TCApproval() {
  const { isDarkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th-A",
      fatherName: "Ramesh Sharma",
      reason: "Transfer to another school due to family relocation to another city",
      appliedDate: "15-Apr-2024",
      status: "Pending",
    },
    {
      id: 2,
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th-B",
      fatherName: "Suresh Verma",
      reason: "Family relocation to another state",
      appliedDate: "18-Apr-2024",
      status: "Pending",
    },
    {
      id: 3,
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th-A",
      fatherName: "Ajay Singh",
      reason: "Personal reasons - pursuing education abroad",
      appliedDate: "10-Apr-2024",
      status: "Approved",
    },
  ]);

  const filteredRequests = requests.filter(
    (req) =>
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.scholarNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests(
      requests.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return (
          <span className="flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle size={14} /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-3 py-1 rounded-full text-sm font-medium">
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className={`text-3xl font-bold transition-colors duration-300 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          TC Approval
        </h1>
        <p className={`transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
          Review and manage Transfer Certificate requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-100">
              <Clock className="text-yellow-600" size={28} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {requests.filter((r) => r.status === "Pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-100">
              <CheckCircle className="text-green-600" size={28} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Approved</p>
              <p className="text-3xl font-bold text-green-600">
                {requests.filter((r) => r.status === "Approved").length}
              </p>
            </div>
          </div>
        </div>
        <div className={`p-5 rounded-xl border shadow-sm transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-100">
              <XCircle className="text-red-600" size={28} />
            </div>
            <div>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Rejected</p>
              <p className="text-3xl font-bold text-red-600">
                {requests.filter((r) => r.status === "Rejected").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={`border rounded-xl p-4 shadow-sm mb-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        <div className="relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`} size={18} />
          <input
            type="text"
            placeholder="Search by name or scholar number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-md transition-colors duration-300 ${
              isDarkMode 
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400" 
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-blue-400"
            }`}
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className={`border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 border-gray-700 hover:border-gray-600" : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              {/* Student Info */}
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-xl ${isDarkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                  <User className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                    {request.name}
                  </h3>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Scholar No: <span className="font-medium">{request.scholarNo}</span>
                  </p>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Class: <span className="font-medium">{request.class}</span>
                  </p>
                  <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                    Father's Name: <span className="font-medium">{request.fatherName}</span>
                  </p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-end gap-3">
                {getStatusBadge(request.status)}
                <div className={`flex items-center gap-1 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  <Calendar size={14} />
                  Applied: {request.appliedDate}
                </div>
              </div>
            </div>

            {/* Reason */}
            <div className={`mt-4 p-4 rounded-xl ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-2">
                <MessageSquare size={16} />
                <span className="font-medium">Reason:</span>
              </div>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>{request.reason}</p>
            </div>

            {/* Action Buttons */}
            {request.status === "Pending" && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors duration-300 font-medium"
                >
                  <XCircle size={18} />
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className={`text-center py-12 border rounded-xl ${
          isDarkMode ? "bg-gray-800 border-gray-700 text-gray-400" : "bg-white border-gray-200 text-gray-500"
        }`}>
          <FileText size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No TC requests found</p>
        </div>
      )}

    </div>
  );
}

