import React from "react";
import { Link } from "react-router-dom";

const RoleSelection = () => {
  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Access your dashboard, attendance, fees, internships and more",
      icon: "🎓",
      gradient: "from-blue-500 to-cyan-500",
      border: "border-blue-500/30 hover:border-blue-400",
      bgHover: "hover:bg-blue-500/20"
    },
    {
      id: "cdc",
      title: "CDC",
      description: "Career Development Center - Manage companies and placements",
      icon: "🏢",
      gradient: "from-purple-500 to-pink-500",
      border: "border-purple-500/30 hover:border-purple-400",
      bgHover: "hover:bg-purple-500/20"
    },
    {
      id: "fee",
      title: "Fee Department",
      description: "Manage student fees, records and fee approvals",
      icon: "💰",
      gradient: "from-green-500 to-emerald-500",
      border: "border-green-500/30 hover:border-green-400",
      bgHover: "hover:bg-green-500/20"
    },
    {
      id: "department",
      title: "Department",
      description: "Manage student attendance, forms verification and department activities",
      icon: "🏛️",
      gradient: "from-orange-500 to-red-500",
      border: "border-orange-500/30 hover:border-orange-400",
      bgHover: "hover:bg-orange-500/20"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-6 shadow-2xl shadow-purple-500/30">
          <span className="text-4xl">🎓</span>
        </div>
        <h1 className="text-5xl font-bold text-white mb-3">CampusFlow</h1>
        <p className="text-blue-300 font-medium text-lg">Acropolis Institute of Technology & Research</p>
        <p className="text-slate-400 text-sm mt-2">Select your portal to continue</p>
      </div>

      {/* Role Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {roles.map((role) => (
          <Link
            key={role.id}
            to={`/${role.id}-login`}
            className={`group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border-2 ${role.border} ${role.bgHover} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
          >
            <div className="flex items-center space-x-5">
              <div className={`w-14 h-14 bg-gradient-to-br ${role.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{role.icon}</span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300">
                  {role.title}
                </h2>
                <p className="text-sm text-slate-400 mt-1">{role.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="relative mt-12 text-center">
        <p className="text-slate-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Register as Student
          </Link>
        </p>
        <Link
          to="/login"
          className="inline-block mt-4 text-slate-500 hover:text-white transition-colors"
        >
          ← Back to Combined Login
        </Link>
      </div>
    </div>
  );
};

export default RoleSelection;

