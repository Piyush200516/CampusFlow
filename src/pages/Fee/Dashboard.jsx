import { DollarSign, CreditCard, Users, FileText, CheckCircle, XCircle, Clock } from "lucide-react";

export default function FeeDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Fee Department Dashboard</h1>
        <p className="text-gray-500">Manage student fees and transactions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {/* Total Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <Users className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">1,250</p>
          <p className="text-sm text-gray-500 mt-2">Active students</p>
        </div>

        {/* Fee Collected */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Fee Collected</h3>
            <DollarSign className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">₹45,00,000</p>
          <p className="text-sm text-gray-500 mt-2">This month</p>
        </div>

        {/* Pending Payments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pending Payments</h3>
            <Clock className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">85</p>
          <p className="text-sm text-gray-500 mt-2">Students pending</p>
        </div>

        {/* TC Requests */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">TC Requests</h3>
            <FileText className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">12</p>
          <p className="text-sm text-gray-500 mt-2">Pending approval</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            <FileText className="inline mr-2" size={18} />
            View Fee Records
          </button>
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            <CreditCard className="inline mr-2" size={18} />
            Update Fee Status
          </button>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
            <Users className="inline mr-2" size={18} />
            Manage Student Fees
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Scholar No.</th>
                <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold">Class</th>
                <th className="text-left py-3 px-4 font-semibold">Amount</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">AITR040613</td>
                <td className="py-3 px-4">Rahul Sharma</td>
                <td className="py-3 px-4">10th</td>
                <td className="py-3 px-4">₹12,000</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <CheckCircle size={14} /> Paid
                  </span>
                </td>
                <td className="py-3 px-4">10-Apr-2024</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">AITR240613</td>
                <td className="py-3 px-4">Anjali Verma</td>
                <td className="py-3 px-4">9th</td>
                <td className="py-3 px-4">₹10,000</td>
                <td className="py-3 px-4">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <XCircle size={14} /> Unpaid
                  </span>
                </td>
                <td className="py-3 px-4">-</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">AITR350714</td>
                <td className="py-3 px-4">Priya Singh</td>
                <td className="py-3 px-4">11th</td>
                <td className="py-3 px-4">₹15,000</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <CheckCircle size={14} /> Paid
                  </span>
                </td>
                <td className="py-3 px-4">15-Apr-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
