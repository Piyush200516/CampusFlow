import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FeeStatus() {

  const navigate = useNavigate();

  // Demo data
  const [fees] = useState([
    { sem: "Semester 1", amount: 35000, status: "Paid" },
    { sem: "Semester 2", amount: 35000, status: "Paid" },
    { sem: "Semester 3", amount: 37000, status: "Pending" },
    { sem: "Semester 4", amount: 37000, status: "Pending" },
    { sem: "Semester 5", amount: 39000, status: "Upcoming" },
  ]);

  const statusColor = (status) => {
    if (status === "Paid") return "bg-green-100 text-green-700";
    if (status === "Pending") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800">
        Fee Status
      </h1>
      <p className="text-gray-500 mt-1">
        Track your semester fee payments
      </p>

      {/* Table */}
      <div className="mt-6 bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Semester</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.map((f, i) => (
              <tr key={i} className="border-t">
                <td className="p-4 font-medium">{f.sem}</td>

                <td className="p-4">₹ {f.amount}</td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColor(f.status)}`}>
                    {f.status}
                  </span>
                </td>

                <td className="p-4">
                  {f.status === "Pending" && (
                    <button
onClick={() => navigate("/pay-fee")}
                      className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
                    >
                      Pay Now
                    </button>
                  )}

                  {f.status === "Paid" && (
                    <span className="text-green-600 font-medium">
                      Completed
                    </span>
                  )}

                  {f.status === "Upcoming" && (
                    <span className="text-gray-400">
                      Not Open
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}