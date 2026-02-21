import { useState } from "react";

export default function FeeInquiry() {

  // 🔹 State to store scholar number input
  const [scholar, setScholar] = useState("");

  // 🔹 State to store found student data
  const [student, setStudent] = useState(null);

  // 🔹 Dummy database (future me backend/API se replace hoga)
  const students = [
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
    },
    {
      scholarNo: "202102",
      name: "Anjali Verma",
      class: "9th",
      phone: "9123456780",
      email: "anjali@email.com",
      feeStatus: "Unpaid",
    },
  ];

  // 🔹 Function: Scholar number search karke student find karta hai
  const handleSearch = () => {
    // Array me scholar match karo
    const result = students.find((s) => s.scholarNo === scholar);

    // Student mila to set karo, warna null
    setStudent(result || null);
  };

  // 🔹 Function: Payment record simulation (frontend demo)
  const recordPayment = () => {
    // Agar student unpaid hai to uska status update karo
    setStudent({
      ...student,
      feeStatus: "Paid",
      paidOn: new Date().toLocaleDateString(),
      amount: "12000",
      method: "Cash",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">

      {/* 🔹 Header */}
      <h1 className="text-3xl font-bold text-white bg-blue-600 px-6 py-3 rounded-lg shadow">
        Student Fee Inquiry
      </h1>

      {/* 🔹 Search Section */}
      <div className="flex gap-3 mt-8">
        {/* Input field for scholar number */}
        <input
          type="text"
          placeholder="Enter Scholar Number"
          value={scholar}
          onChange={(e) => setScholar(e.target.value)}
          className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* 🔹 Student Card */}
      {student && (
        <div className="bg-white shadow-lg rounded-xl p-6 mt-8 w-[420px]">

          {/* Student basic info */}
          <div className="flex justify-between items-center border-b pb-3 mb-3">
            <h2 className="text-xl font-semibold">{student.name}</h2>
            <span className="text-sm text-gray-500">
              Scholar: {student.scholarNo}
            </span>
          </div>

          <p><b>Class:</b> {student.class}</p>
          <p><b>Phone:</b> {student.phone}</p>
          <p><b>Email:</b> {student.email}</p>

          {/* Fee Status */}
          <div className="mt-4 font-semibold">
            Fee Status:
            <span
              className={`ml-2 px-2 py-1 rounded text-white ${
                student.feeStatus === "Paid"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {student.feeStatus}
            </span>
          </div>

          {/* 🔹 If Paid → show details */}
          {student.feeStatus === "Paid" && (
            <div className="bg-blue-50 mt-3 p-3 rounded">
              <p><b>Paid On:</b> {student.paidOn}</p>
              <p><b>Amount:</b> ₹ {student.amount}</p>
              <p><b>Method:</b> {student.method}</p>
            </div>
          )}

          {/* 🔹 If Unpaid → show payment button */}
          {student.feeStatus === "Unpaid" && (
            <button
              onClick={recordPayment}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Record Payment
            </button>
          )}
        </div>
      )}
    </div>
  );
}