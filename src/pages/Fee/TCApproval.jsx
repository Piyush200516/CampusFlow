import { useState } from "react";
import { Search, CheckCircle, XCircle, Clock, FileText, User } from "lucide-react";

export default function TCApproval() {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([
    {
      id: 1,
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th",
      fatherName: "Ramesh Sharma",
      reason: "Transfer to another school",
      appliedDate: "15-Apr-2024",
      status: "Pending",
    },
    {
      id: 2,
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th",
      fatherName: "Suresh Verma",
      reason: "Family relocation",
      appliedDate: "18-Apr-2024",
      status: "Pending",
    },
    {
      id: 3,
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th",
      fatherName: "Ajay Singh",
      reason: "Personal reasons",
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
          <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
            <CheckCircle size={14} /> Approved
          </span>
        );
      case "Rejected":
        return (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm">
            <XCircle size={14} /> Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm">
            <Clock size={14} /> Pending
          </span>
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">TC Approval</h1>
        <p className="text-gray-500">Review and manage Transfer Certificate requests.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold">
                {requests.filter((r) => r.status === "Pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Approved</p>
              <p className="text-2xl font-bold">
                {requests.filter((r) => r.status === "Approved").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-lg">
              <XCircle className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Rejected</p>
              <p className="text-2xl font-bold">
                {requests.filter((r) => r.status === "Rejected").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or scholar number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md"
          />
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <div
            key={request.id}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex flex-wrap justify-between items-start gap-4">
              {/* Student Info */}
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{request.name}</h3>
                  <p className="text-gray-500 text-sm">Scholar No: {request.scholarNo}</p>
                  <p className="text-gray-500 text-sm">Class: {request.class}</p>
                  <p className="text-gray-500 text-sm">Father: {request.fatherName}</p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-end gap-3">
                {getStatusBadge(request.status)}
                <p className="text-sm text-gray-500">
                  Applied: {request.appliedDate}
                </p>
              </div>
            </div>

            {/* Reason */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={16} />
                <span className="font-medium">Reason:</span>
              </div>
              <p className="mt-1 text-gray-700">{request.reason}</p>
            </div>

            {/* Action Buttons */}
            {request.status === "Pending" && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleApprove(request.id)}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
        <div className="text-center py-12 text-gray-500">
          No TC requests found.
        </div>
      )}

    </div>
  );
}
