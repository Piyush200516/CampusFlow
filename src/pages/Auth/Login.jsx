import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|org)$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format! Must contain @ and .com/.in/.org");
      return;
    }

    // ✅ Password Validation
    const numberCount = (password.match(/\d/g) || []).length;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (numberCount < 3) {
      alert("Password must contain at least 3 numbers");
      return;
    }
    if (!hasCapital) {
      alert("Password must contain at least 1 capital letter");
      return;
    }
    if (!hasSpecial) {
      alert("Password must contain at least 1 special character");
      return;
    }

    // ✅ All validation passed → save email for dashboard
    localStorage.setItem("studentEmail", email);

    // If you connect to database in future:
    // 1. Send login info to backend API
    // fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) })
    //   .then(res => res.json())
    //   .then(data => { navigate("/dashboard"); });

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Student Login
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
