import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  Clipboard,
  Briefcase,
  Award,
  Clock,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

export default function Dashboard() {
  const [cafStatus, setCafStatus] = useState({ approved: false });
  const [studentEmail, setStudentEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("studentEmail");

    if (!email) {
      navigate("/login");
      return;
    }

    setStudentEmail(email);

    setTimeout(() => {
      setCafStatus({ approved: true });
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentEmail");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", icon: Home },
    { name: "Information Form", icon: Clipboard },
    { name: "Internships / Job", icon: Briefcase },
    { name: "TC", icon: Award },
    { name: "Attendance", icon: Clock },
    { name: "Placement Drives", icon: Users },
    { name: "Mock Interviews", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r flex flex-col justify-between p-4">
        <div>
          <div className="mb-8">
            <span className="font-bold text-xl">Portal</span>
          </div>

          <nav className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to="#"
                className="flex items-center p-2 rounded-md hover:bg-gray-100"
              >
                <link.icon className="h-5 w-5 mr-3" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-2 mt-4 text-red-500 border rounded-md hover:bg-red-100"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            © Team Unity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">

        {/* Top Navbar */}
        <div className="fixed top--0.1 left-64 right-0 h-16 bg-white border-b flex items-center justify-between px-6 z-10">
          
          {/* Logo Left */}
          <div className="flex items-center space-x-3">
            <img
              src="/Acropolis-logo.png"
              alt="Acropolis Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="font-semibold text-gray-700">
            .
            </span>
          </div>

          {/* Email Right */}
          <div className="text-gray-700 font-semibold">
            {studentEmail}
          </div>
        </div>

        {/* Page Content */}
        <div className="mt-16 p-6 overflow-y-auto">
          {/* Dashboard Header */}
<div className="mb-6">
  <h1 className="text-2xl font-bold text-gray-800">
    Student Dashboard
  </h1>
  {/* Dashboard */}
  <p className="text-gray-500 mt-1">
    Manage your placement activities and profile
  </p>
</div>
  {/* Dashboard */}
 <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md mb-6">
  <h2 className="font-semibold text-blue-800">
    🚀 New Update!
  </h2>
  <p className="text-blue-700 mt-1">
    The Certificates section is now unlocked. CAF approval is no longer required to access it.
  </p>
</div>


          {/* CAF Status */}
          <div
            className={`p-4 rounded-md mb-6 ${
              cafStatus.approved
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-gray-100 border-l-4 border-gray-400"
            }`}
          >
            <h2 className="font-semibold text-lg">
              CAF Form {cafStatus.approved ? "Approved" : "Pending"}
            </h2>

            <p className="text-gray-600 mt-1">
              {cafStatus.approved
                ? "Congratulations! Your CAF form has been approved."
                : "Your CAF form is pending approval."}
            </p>

            {cafStatus.approved && (
              <a
                href="/resume-format.pdf"
                download="Resume_Format.pdf"
                className="mt-3 inline-block px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
              >
                Download Resume Format
              </a>
            )}
          </div>

          {/* Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "Attendance",
              "Internships",
              "Placement Drives",
              "Mock Interviews",
            ].map((section) => (
              <div
                key={section}
                className="bg-white p-4 rounded-md shadow"
              >
                <h3 className="font-semibold mb-2">{section}</h3>
                <p className="text-gray-500 text-sm">
                  Manage your {section.toLowerCase()}.
                </p>
                <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600">
                  Access
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
