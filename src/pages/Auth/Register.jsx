import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful (Demo)");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* College Email */}
          <div>
            <label className="block text-sm font-medium mb-1">College Email</label>
            <input
              type="email"
              placeholder="piyushmishra240613@acropolis.in"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* RGPV Enrollment */}
          <div>
            <label className="block text-sm font-medium mb-1">
              RGPV Enrollment No
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select Course</option>
              <option>B.Tech</option>
              <option>M.Tech</option>
              <option>MBA</option>
              <option>BCA</option>
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-sm font-medium mb-1">Branch</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select Course First</option>
              <option>CSE</option>
              <option>IT</option>
              <option>ECE</option>
              <option>Mechanical</option>
            </select>
          </div>

          {/* Batch Year */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Batch Year (Passing Year)
            </label>
            <input
              type="number"
              placeholder="Enter passing year"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-500"
              >
                👁
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
