import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">

        {/* Back to Login */}
        <Link
          to="/"
          className="text-blue-600 text-sm flex items-center mb-6 hover:underline"
        >
          ← Back to Login
        </Link>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Enter your email address and we'll send you an OTP to reset your password.
        </p>

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your.email@acropolis.in"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Send Reset OTP
          </button>
        </form>

      </div>
    </div>
  );
};

export default ForgotPassword;
