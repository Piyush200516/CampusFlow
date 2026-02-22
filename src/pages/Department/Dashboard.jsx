import { Users, BookOpen, ClipboardCheck, FileText, CheckCircle, XCircle, Clock, GraduationCap } from "lucide-react";

export default function DepartmentDashboard() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Department Dashboard</h1>
        <p className="text-gray-500">Manage students, attendance, and academic records.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        {/* Total Students */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Total Students</h3>
            <Users className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-blue-600">450</p>
          <p className="text-sm text-gray-500 mt-2">Enrolled students</p>
        </div>

        {/* Classes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Classes</h3>
            <BookOpen className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-600">12</p>
          <p className="text-sm text-gray-500 mt-2">Active classes</p>
        </div>

        {/* Attendance */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <ClipboardCheck className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-orange-600">92%</p>
          <p className="text-sm text-gray-500 mt-2">Average attendance</p>
        </div>

        {/* Pending Forms */}
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Pending Forms</h3>
            <Clock className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-purple-600">15</p>
          <p className="text-sm text-gray-500 mt-2">Awaiting verification</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            <Users className="inline mr-2" size={18} />
            Student List
          </button>
          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
            <ClipboardCheck className="inline mr-2" size={18} />
            Update Attendance
          </button>
          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700">
            <FileText className="inline mr-2" size={18} />
            Verify Forms
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Student Activity</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold">Scholar No.</th>
                <th className="text-left py-3 px-4 font-semibold">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold">Class</th>
                <th className="text-left py-3 px-4 font-semibold">Activity</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">AITR040613</td>
                <td className="py-3 px-4">Rahul Sharma</td>
                <td className="py-3 px-4">10th-A</td>
                <td className="py-3 px-4">TC Application</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <CheckCircle size={14} /> Verified
                  </span>
                </td>
                <td className="py-3 px-4">10-Apr-2024</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">AITR240613</td>
                <td className="py-3 px-4">Anjali Verma</td>
                <td className="py-3 px-4">9th-B</td>
                <td className="py-3 px-4">Attendance Update</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <Clock size={14} /> Updated
                  </span>
                </td>
                <td className="py-3 px-4">09-Apr-2024</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">AITR350714</td>
                <td className="py-3 px-4">Priya Singh</td>
                <td className="py-3 px-4">11th-A</td>
                <td className="py-3 px-4">Bonafide Certificate</td>
                <td className="py-3 px-4">
                  <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-sm flex items-center gap-1 w-fit">
                    <Clock size={14} /> Pending
                  </span>
                </td>
                <td className="py-3 px-4">08-Apr-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
