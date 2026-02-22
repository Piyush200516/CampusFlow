import { useEffect, useState } from "react";

export default function CDCApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(stored);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h2 className="text-2xl font-bold mb-6">
        All Student Applications
      </h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Scholar No</th>
            <th className="p-2">Company</th>
            <th className="p-2">Role</th>
            <th className="p-2">CGPA</th>
            <th className="p-2">Skills</th>
            <th className="p-2">Resume</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app, i) => (
            <tr key={i} className="text-center border-t">
              <td className="p-2">{app.scholarNo}</td>
              <td className="p-2">{app.company}</td>
              <td className="p-2">{app.role}</td>
              <td className="p-2">{app.cgpa}</td>
              <td className="p-2">{app.skills}</td>
              <td className="p-2">
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}