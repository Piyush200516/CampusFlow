import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import API from "../../services/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const roles = [
    { id: "student", label: "Student", icon: "🎓" },
    { id: "fee", label: "Fee Department", icon: "💰" },
    { id: "cdc", label: "CDC", icon: "🏢" },
    { id: "department", label: "Department", icon: "🏛️" }
  ];

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowOtp(false);

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

      if (response.data.needs_mfa) {
        setTempToken(response.data.temp_token);
        setShowOtp(true);
        setLoading(false);
        return;
      }

      // Normal login success
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
    } catch (error) {
      setLoading(false);
      if (error.response) alert(error.response.data.message || "Login failed");
      else if (error.request) alert("Server not responding. Please try again later.");
      else alert("An error occurred. Please try again.");
    }
  };

  const handleOtpLogin = async () => {
    if (otp.length !== 6) {
      alert("Enter valid 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await API.post("/api/mfa/login-verify", { temp_token: tempToken, token: otp });
      
      const user = response.data.user;
      const role = response.data.role;
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
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || "Invalid OTP");
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

        {!showOtp ? (
          <form className="space-y-5" onSubmit={(e) => handlePasswordLogin(e)}>
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
        ) : (
          <div className="space-y-5">
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">2FA Verification Required</h2>
              <p className="text-gray-600 mb-1">Enter the 6-digit code from Google Authenticator</p>
              <p className="text-sm text-gray-500">Codes refresh every 30 seconds</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">One-Time Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-5 text-2xl font-mono tracking-widest text-center border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                placeholder="000 000"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleOtpLogin}
                disabled={loading || otp.length !== 6}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:from-emerald-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Continue to Dashboard"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOtp(false);
                  setOtp("");
                  setTempToken("");
                }}
                className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        )}

        {/* Sign Up Link */}
        <div className={`mt-8 pt-6 border-t border-gray-200 text-center ${showOtp ? "hidden" : ""}`}>
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

