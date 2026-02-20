import { useState } from "react";

export default function AvailableDrives() {
  // demo state (baad me API se replace kar sakte ho)
  const [drives, setDrives] = useState([]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <h1 className="text-3xl font-semibold text-gray-800">
        Available Placement Drives
      </h1>
      <p className="text-gray-500 mt-1">
        Browse and apply to placement opportunities
      </p>

      {/* Card */}
      <div className="mt-6 bg-white rounded-xl shadow border p-10 flex justify-center items-center">

        {/* No Data */}
        {drives.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">
              No placement drives available at the moment
            </p>
            <p className="text-gray-400 mt-1">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          // Drives List
          <div className="w-full space-y-4">
            {drives.map((drive, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 flex justify-between items-center hover:shadow transition"
              >
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {drive.company}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Role: {drive.role}
                  </p>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}