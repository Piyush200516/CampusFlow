import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: "student", label: "Student", icon: "🎓", color: "blue" },
    { id: "fee", label: "Fee Department", icon: "💰", color: "green" },
    { id: "cdc", label: "CDC", icon: "🏢", color: "purple" },
    { id: "department", label: "Department", icon: "🏛️", color: "orange" }
  ];

  const getRoleColor = (roleId) => {
    const colors = {
      student: { bg: "bg-blue-50", border: "border-blue-500", text: "text-blue-600", button: "bg-blue-600" },
      fee: { bg: "bg-green-50", border: "border-green-500", text: "text-green-600", button: "bg-green-600" },
      cdc: { bg: "bg-purple-50", border: "border-purple-500", text: "text-purple-600", button: "bg-purple-600" },
      department: { bg: "bg-orange-50", border: "border-orange-500", text: "text-orange-600", button: "bg-orange-600" }
    };
    return colors[roleId] || colors.student;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|org)$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format! Must contain @ and .com/.in/.org");
      setLoading(false);
      return;
    }

    const numberCount = (password.match(/\d/g) || []).length;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (numberCount < 3) {
      alert("Password must contain at least 3 numbers");
      setLoading(false);
      return;
    }
    if (!hasCapital) {
      alert("Password must contain at least 1 capital letter");
      setLoading(false);
      return;
    }
    if (!hasSpecial) {
      alert("Password must contain at least 1 special character");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/api/login", { email, password, role });

      if (response.data.message === "Login Successful") {
        const user = response.data.user;
        
        if (role === "cdc") localStorage.setItem("cdcEmail", email);
        else if (role === "fee") localStorage.setItem("feeEmail", email);
        else if (role === "department") localStorage.setItem("departmentEmail", email);
        else localStorage.setItem("studentEmail", email);
        
        localStorage.setItem("userRole", role);
        localStorage.setItem("userData", JSON.stringify(user));

        if (role === "fee") navigate("/fee/dashboard");
        else if (role === "cdc") navigate("/cdc/dashboard");
        else if (role === "department") navigate("/department/dashboard");
        else navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) alert(error.response.data.message || "Login failed");
      else if (error.request) alert("Server not responding. Please try again later.");
      else alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentColor = getRoleColor(role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-md p-8 border border-white/20">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-white">CampusFlow</h1>
          <p className="text-blue-300 font-medium mt-2">Acropolis Institute of Technology & Research</p>
          <p className="text-slate-400 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-slate-300 mb-3 text-sm font-medium">Select Login Type</label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1 ${
                  role === r.id
                    ? `${currentColor.border} ${currentColor.bg} ${currentColor.text} font-semibold scale-105`
                    : "border-slate-600/50 text-slate-400 hover:border-slate-500 hover:bg-white/5"
                }`}
              >
                <span className="text-xl">{r.icon}</span>
                <span className="text-xs">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${currentColor.button} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              `Sign in as ${roles.find(r => r.id === role)?.label}`
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-slate-400 mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

