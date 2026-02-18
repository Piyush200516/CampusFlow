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
    { name: "Fee", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r flex flex-col justify-between p-4">
        <div>
          <div className="mb-8 flex items-center space-x-2">
  <img
    src="/aitr-logo.jpg"
    alt="AITR Logo"
    className="h-8 w-auto object-contain"
  />
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
        <div className="fixed top-0 left-64 right-0 h-16 bg-white border-b flex items-center justify-between px-6 z-10">

          <div className="flex items-center space-x-3">
            <img
              src="/Acropolis-logo.png"
              alt="Acropolis Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          <div className="text-gray-700 font-semibold">
            {studentEmail}
          </div>
        </div>

        {/* Page Content */}
        <div className="mt-16 p-6 overflow-y-auto">

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Student Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your College / placement activities and profile
            </p>
          </div>

          {/* Update Box */}
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md mb-6">
            <h2 className="font-semibold text-blue-800">
              🚀 New Update!
            </h2>
            <p className="text-blue-700 mt-1">
              The Certificates section is now unlocked. Approval is no longer required to access it.
            </p>
          </div>

          {/* Information Form Status */}
          <div
            className={`p-4 rounded-md mb-6 ${
              cafStatus.approved
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-gray-100 border-l-4 border-gray-400"
            }`}
          >
            <h2 className="font-semibold text-lg">
              Information Form {cafStatus.approved ? "Approved" : "Pending"}
            </h2>

            <p className="text-gray-600 mt-1">
              {cafStatus.approved
                ? "Congratulations! Your Information form has been approved."
                : "Your Information form is pending approval."}
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
          {/* leave from  */}
          <div
            className={`p-4 rounded-md mb-6 ${
              cafStatus.approved
                ? "bg-green-100 border-l-4 border-green-500"
                : "bg-gray-100 border-l-4 border-gray-400"
            }`}
          >
            <h2 className="font-semibold text-lg">
              leave from Application
            </h2>

            <p className="text-gray-600 mt-1">
              {cafStatus.approved
                ? "leave from for Download."
                : "."}
            </p>

            {cafStatus.approved && (
              <a
                href="/leave-format.pdf"
                download="Download_Format.pdf"
                className="mt-3 inline-block px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
              >
                Download Leave From Format
              </a>
            )}
          </div>
          
          {/* Dashboard Cards Section (Screenshot Style) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Attendance</h3>
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Mark your attendance for active sessions.
              </p>
              <button className="w-full border rounded-md py-2 hover:bg-gray-100">
                Access
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Internships / Job</h3>
                <Briefcase className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Manage your internship / Job records and PPO details.
              </p>
              <button className="w-full border rounded-md py-2 hover:bg-gray-100">
                Access
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Fee</h3>
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                View and Submit for Fee.
              </p>
              <button className="w-full border rounded-md py-2 hover:bg-gray-100">
                Access
              </button>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">TC</h3>
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-gray-500 text-sm mb-4">
                Apply for TC
              </p>
              <button className="w-full border rounded-md py-2 hover:bg-gray-100">
                Access
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
