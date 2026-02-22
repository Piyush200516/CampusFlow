import { useState } from "react";
import { Search, Filter, Download, Eye, CheckCircle, XCircle } from "lucide-react";

export default function StudentFees() {
  // Sample data
  const [students, setStudents] = useState([
    {
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th",
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
      class: "9th",
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
      class: "11th",
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
      class: "12th",
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
        return "bg-green-100 text-green-700";
      case "Unpaid":
        return "bg-red-100 text-red-700";
      case "Partial":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Student Fees Management</h1>
        <p className="text-gray-500">View and manage all student fee records.</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or scholar number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All">All Status</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Partial">Partial</option>
              </select>
            </div>
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Download size={18} />
            Export Data
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-semibold">Scholar No.</th>
                <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold">Class</th>
                <th className="text-left py-3 px-4 font-semibold">Phone</th>
                <th className="text-left py-3 px-4 font-semibold">Fee Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Paid On</th>
                <th className="text-left py-3 px-4 font-semibold">Method</th>
                <th className="text-left py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{student.scholarNo}</td>
                  <td className="py-3 px-4 font-medium">{student.name}</td>
                  <td className="py-3 px-4">{student.class}</td>
                  <td className="py-3 px-4">{student.phone}</td>
                  <td className="py-3 px-4">₹{student.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit ${getStatusColor(student.feeStatus)}`}>
                      {student.feeStatus === "Paid" && <CheckCircle size={14} />}
                      {student.feeStatus === "Unpaid" && <XCircle size={14} />}
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">{student.paidOn}</td>
                  <td className="py-3 px-4">{student.method}</td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
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
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm">Total Students</h3>
          <p className="text-2xl font-bold">{students.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm">Paid</h3>
          <p className="text-2xl font-bold text-green-600">{students.filter(s => s.feeStatus === "Paid").length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <h3 className="text-gray-500 text-sm">Unpaid</h3>
          <p className="text-2xl font-bold text-red-600">{students.filter(s => s.feeStatus === "Unpaid").length}</p>
        </div>
      </div>

    </div>
  );
}
