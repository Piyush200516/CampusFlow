import { useState } from "react";
import { Search, Save, CheckCircle, XCircle } from "lucide-react";

export default function FeeUpdate() {
  const [scholarNo, setScholarNo] = useState("");
  const [student, setStudent] = useState(null);
  const [updateData, setUpdateData] = useState({
    amount: "",
    dueDate: "",
    notes: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Sample student database
  const students = [
    {
      scholarNo: "AITR040613",
      name: "Rahul Sharma",
      class: "10th",
      currentFee: 12000,
      status: "Paid",
    },
    {
      scholarNo: "AITR240613",
      name: "Anjali Verma",
      class: "9th",
      currentFee: 10000,
      status: "Unpaid",
    },
    {
      scholarNo: "AITR350714",
      name: "Priya Singh",
      class: "11th",
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
    // Logic to update fee would go here
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fee Update</h1>
        <p className="text-gray-500">Update student fee details and due dates.</p>
      </div>

      {/* Search Section */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Search Student</h2>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Enter Scholar Number"
              value={scholarNo}
              onChange={(e) => setScholarNo(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Student Details & Update Form */}
      {student && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Current Student Info */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Student Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Scholar Number:</span>
                <span className="font-medium">{student.scholarNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">{student.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Class:</span>
                <span className="font-medium">{student.class}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Current Fee:</span>
                <span className="font-medium">₹{student.currentFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  student.status === "Paid" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {student.status === "Paid" ? <CheckCircle size={14} className="inline mr-1" /> : <XCircle size={14} className="inline mr-1" />}
                  {student.status}
                </span>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Update Fee Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Fee Amount (₹)
                </label>
                <input
                  type="number"
                  value={updateData.amount}
                  onChange={(e) => setUpdateData({ ...updateData, amount: e.target.value })}
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={updateData.dueDate}
                  onChange={(e) => setUpdateData({ ...updateData, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={updateData.notes}
                  onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                  placeholder="Add any notes..."
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button
                onClick={handleUpdate}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                <Save size={18} />
                Update Fee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle size={20} />
          Fee updated successfully!
        </div>
      )}

      {/* No Student Found */}
      {scholarNo && !student && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
          <p className="text-red-700">No student found with scholar number: {scholarNo}</p>
        </div>
      )}

    </div>
  );
}
