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
    { id: "student", label: "Student", icon: "🎓" },
    { id: "fee", label: "Fee Department", icon: "💰" },
    { id: "cdc", label: "CDC", icon: "🏢" },
    { id: "department", label: "Department", icon: "🏛️" }
  ];

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">CampusFlow</h1>
          <p className="text-gray-600 font-medium mt-2">Acropolis Institute of Technology & Research</p>
          <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-3 text-sm font-medium">Select Login Type</label>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`py-3 px-4 rounded-xl border-2 transition-all ${
                  role === r.id
                    ? "border-blue-600 bg-blue-50 text-blue-600 font-semibold"
                    : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}
              >
                <span className="text-xl">{r.icon}</span>
                <span className="text-xs block mt-1">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded-xl font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : `Sign in as ${roles.find(r => r.id === role)?.label}`}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

