import { Briefcase, Users, FileText, CheckCircle, XCircle, Clock, Building } from "lucide-react";

export default function CDCDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">CDC (Career Development Cell) Dashboard</h1>
        <p className="text-gray-500">Manage placements, companies, and student applications.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {/* Total Companies */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Total Companies</h3>
            <Building className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">45</p>
          <p className="text-sm text-gray-500 mt-2">Active recruiters</p>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Applications</h3>
            <Users className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">320</p>
          <p className="text-sm text-gray-500 mt-2">Total applications</p>
        </div>

        {/* Placed Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Placed Students</h3>
            <CheckCircle className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">180</p>
          <p className="text-sm text-gray-500 mt-2">Students placed</p>
        </div>

        {/* Pending Applications */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pending</h3>
            <Clock className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">85</p>
          <p className="text-sm text-gray-500 mt-2">Under review</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            <Briefcase className="inline mr-2" size={18} />
            Add Company
          </button>
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            <Users className="inline mr-2" size={18} />
            View Companies
          </button>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
            <FileText className="inline mr-2" size={18} />
            View Applications
          </button>
        </div>
      </div>

      {/* Recent Placements */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Placements</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Company</th>
                <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold">Package</th>
                <th className="text-left py-3 px-4 font-semibold">Role</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">Google</td>
                <td className="py-3 px-4">Rahul Sharma</td>
                <td className="py-3 px-4">₹18,00,000</td>
                <td className="py-3 px-4">Software Engineer</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <CheckCircle size={14} /> Selected
                  </span>
                </td>
                <td className="py-3 px-4">10-Apr-2024</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">Amazon</td>
                <td className="py-3 px-4">Anjali Verma</td>
                <td className="py-3 px-4">₹15,00,000</td>
                <td className="py-3 px-4">SDE</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <CheckCircle size={14} /> Selected
                  </span>
                </td>
                <td className="py-3 px-4">08-Apr-2024</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">Microsoft</td>
                <td className="py-3 px-4">Priya Singh</td>
                <td className="py-3 px-4">₹14,00,000</td>
                <td className="py-3 px-4">Software Engineer</td>
                <td className="py-3 px-4">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <Clock size={14} /> Pending
                  </span>
                </td>
                <td className="py-3 px-4">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
