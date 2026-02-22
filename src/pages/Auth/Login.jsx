import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [scholarNo, setScholarNo] = useState("");
  const [role, setRole] = useState("student"); // "student", "fee", "cdc", or "department"
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.(com|in|org)$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format! Must contain @ and .com/.in/.org");
      setLoading(false);
      return;
    }

    // ✅ Password Validation 
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
      // ✅ Call Login API to validate with database
      const response = await API.post("/login", {
        email,
        password,
        role
      });

      if (response.data.message === "Login Successful ✅") {
        const user = response.data.user;
        
        // ✅ Save user data from database to localStorage
        localStorage.setItem("studentEmail", email);
        localStorage.setItem("userRole", role);
        localStorage.setItem("scholarNo", scholarNo);
        localStorage.setItem("userData", JSON.stringify(user));

        // Redirect based on role
        if (role === "fee") {
          navigate("/fee/dashboard");
        } else if (role === "cdc") {
          navigate("/cdc/dashboard");
        } else if (role === "department") {
          navigate("/department/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else if (error.request) {
        alert("Server not responding. Please try again later.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-2 text-sm font-medium">Select Login Type</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`py-2 px-4 rounded-lg border-2 transition-all ${
                role === "student"
                  ? "border-blue-600 bg-blue-50 text-blue-600 font-semibold"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("fee")}
              className={`py-2 px-4 rounded-lg border-2 transition-all ${
                role === "fee"
                  ? "border-green-600 bg-green-50 text-green-600 font-semibold"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Fee Department
            </button>
            <button
              type="button"
              onClick={() => setRole("cdc")}
              className={`py-2 px-4 rounded-lg border-2 transition-all ${
                role === "cdc"
                  ? "border-purple-600 bg-purple-50 text-purple-600 font-semibold"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              CDC
            </button>
            <button
              type="button"
              onClick={() => setRole("department")}
              className={`py-2 px-4 rounded-lg border-2 transition-all ${
                role === "department"
                  ? "border-orange-600 bg-orange-50 text-orange-600 font-semibold"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              Department
            </button>
          </div>
        </div>

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
            className={`w-full text-white py-2 rounded-lg hover:opacity-90 transition ${
              role === "fee" ? "bg-green-600" : 
              role === "cdc" ? "bg-purple-600" : 
              role === "department" ? "bg-orange-600" : "bg-blue-600"
            }`}
          >
            Login as {role === "fee" ? "Fee Department" : role === "cdc" ? "CDC" : role === "department" ? "Department" : "Student"}
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
