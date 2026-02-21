// Role-Based Access

//Student

//CDC

//Department

//College Student Section

//1️⃣2️⃣ 📊 Dashboard Analytics

//Attendance percentage chart

//Fee progress bar

//Placement status card

//TC status tracker
// ======================================================
// 📊 Dashboard_Analytics.jsx
// Description: Student Dashboard Analytics Page
// Includes: Attendance Chart, Fee Progress,
//           Placement Status, TC Status Tracker
// Author: Piyush Mishra
// ======================================================
import { FaUserGraduate, FaRupeeSign, FaBriefcase, FaFileAlt } from "react-icons/fa";

export default function Dashboard_Analytics() {

  // ===================== DATA SECTION =====================

  const attendance = 82;

  const semesterFees = [
    { sem: 1, amount: 30000, status: "Paid" },
    { sem: 2, amount: 30000, status: "Paid" },
    { sem: 3, amount: 30000, status: "Pending" },
    { sem: 4, amount: 30000, status: "Pending" },
  ];

  const totalFees = semesterFees.reduce((sum, s) => sum + s.amount, 0);
  const paidFees = semesterFees
    .filter((s) => s.status === "Paid")
    .reduce((sum, s) => sum + s.amount, 0);

  const feePercent = Math.round((paidFees / totalFees) * 100);

  // ===================== UI SECTION =====================

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">

      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-2xl font-bold text-gray-700">
        Student Analytics Dashboard
      </h1>

      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* CDC Attendance Card */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserGraduate className="text-blue-600 text-xl" />
            </div>
            <h2 className="font-semibold text-gray-600">Attendance</h2>
          </div>
          <p className="text-3xl font-bold mt-4 text-gray-800">
            {attendance}%
          </p>

          <div className="w-full bg-gray-200 h-2 rounded mt-3">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${attendance}%` }}
            ></div>
          </div>
        </div>
 
        {/* Attendance Card */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaUserGraduate className="text-blue-600 text-xl" />
            </div>
            <h2 className="font-semibold text-gray-600">Attendance</h2>
          </div>

          <p className="text-3xl font-bold mt-4 text-gray-800">
            {attendance}%
          </p>

          <div className="w-full bg-gray-200 h-2 rounded mt-3">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${attendance}%` }}
            ></div>
          </div>
        </div>
        
        {/* Fees Overview Card */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <FaRupeeSign className="text-orange-600 text-xl" />
            </div>
            <h2 className="font-semibold text-gray-600">Total Fees</h2>
          </div>

          <p className="text-xl font-bold mt-4 text-gray-800">
            ₹{paidFees} / ₹{totalFees}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {feePercent}% Paid
          </p>
        </div>

        {/* Placement Card */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-full">
              <FaBriefcase className="text-green-600 text-xl" />
            </div>
            <h2 className="font-semibold text-gray-600">Placement Status</h2>
          </div>

          <p className="text-xl font-bold mt-4 text-green-600">
            Eligible
          </p>
        </div>

        {/* TC Status Card */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-full">
              <FaFileAlt className="text-red-600 text-xl" />
            </div>
            <h2 className="font-semibold text-gray-600">TC Status</h2>
          </div>

          <p className="text-xl font-bold mt-4 text-red-500">
            Pending
          </p>
        </div>

      </div>

      {/* ================= MIDDLE SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Attendance Overview Circle */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Attendance Overview
          </h2>

          <div className="flex items-center justify-center">
            <div className="relative w-36 h-36">

              <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-700">
                {attendance}%
              </div>

              <svg className="transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                />
                <path
                  className="text-green-500"
                  strokeWidth="4"
                  strokeDasharray={`${attendance}, 100`}
                  stroke="currentColor"
                  fill="transparent"
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                />
              </svg>

            </div>
          </div>
        </div>

        {/* Semester Fee Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Semester Fee Status
          </h2>

          <div className="space-y-4">

            {semesterFees.map((sem) => (
              <div
                key={sem.sem}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  sem.status === "Paid"
                    ? "bg-green-50"
                    : "bg-red-50"
                }`}
              >
                <div>
                  <p className="font-semibold text-gray-700">
                    Semester {sem.sem}
                  </p>
                  <p className="text-sm text-gray-500">
                    ₹{sem.amount}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    sem.status === "Paid"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  {sem.status}
                </span>
              </div>
            ))}

          </div>
        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Placement Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Placement Status
          </h2>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              You are{" "}
              <span className="text-green-600 font-bold">
                eligible
              </span>{" "}
              for placement drives!
            </p>

            <p className="mt-3 text-gray-600">
              Upcoming Drives: Infosys, TCS, Wipro
            </p>
          </div>
        </div>

        {/* TC Application Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            TC Application Status
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li className="text-green-600 font-medium">
              ✔ Applied
            </li>
            <li className="text-yellow-600 font-medium">
              ⏳ Under Review
            </li>
            <li className="text-red-500 font-medium">
              ✖ Not Approved Yet
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}