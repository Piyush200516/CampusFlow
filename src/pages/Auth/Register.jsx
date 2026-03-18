import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    enrollment_no: "",
    course: "",
    branch: "",
    passing_year: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const fullNameRegex = /^[a-zA-Z\\s]+$/;
    const emailRegex = /^[a-zA-Z0-9]+@acropolis\\.in$/;
    const enrollmentRegex = /^[0-9]{4}[A-Z]{2}[a-zA-Z0-9]*$/;
    const yearRegex = /^[0-9]{4}$/;
    const passwordRegex = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&*])[a-zA-Z0-9@#$%^&*]{6,}/;

    if (!fullNameRegex.test(formData.full_name.trim())) {
      alert('Full Name: Only alphabets allowed');
      return;
    }
    if (!emailRegex.test(formData.email.trim())) {
      alert('Email: Must end with @acropolis.in (alphabets/numbers before)');
      return;
    }
    if (!enrollmentRegex.test(formData.enrollment_no.trim())) {
      alert('RGPV Enrollment: 4 digits + 2 alphabets + anything (e.g. 1234AB)');
      return;
    }
    if (!yearRegex.test(formData.passing_year)) {
      alert('Batch Year: 4 digits only (e.g. 2025)');
      return;
    }
    if (!passwordRegex.test(formData.password)) {
      alert('Password: 1 letter, 3 numbers, 1 special (@#$%^&*), min 6 chars');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/api/register", formData);
      if (response.data.message === "Student Registered Successfully") {
        alert("Registration Successful! Please login.");
        navigate("/");
      } else {
        alert(response.data.message || response.data.error);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else if (error.request) {
        alert("Server not responding. Please try again later.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const courses = ["B.Tech", "M.Tech", "MBA", "BCA"];
  const branches = ["CSE", "IT", "ECE", "Mechanical"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-white/20 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🎓</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-blue-300 font-medium mt-2">Acropolis Institute of Technology & Research</p>
          <p className="text-blue-200/70 text-sm mt-1">Join CampusFlow today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-blue-100 mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* College Email */}
          <div>
            <label className="block text-blue-100 mb-2 text-sm font-medium">College Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@acropolis.in"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* RGPV Enrollment */}
          <div>
            <label className="block text-blue-100 mb-2 text-sm font-medium">RGPV Enrollment No</label>
            <input
              type="text"
              name="enrollment_no"
              value={formData.enrollment_no}
              onChange={handleChange}
              placeholder="Enter enrollment number"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Course & Branch */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-blue-100 mb-2 text-sm font-medium">Course</label>
              <select 
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" className="text-gray-800">Select Course</option>
                {courses.map(c => (
                  <option key={c} value={c} className="text-gray-800">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-blue-100 mb-2 text-sm font-medium">Branch</label>
              <select 
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" className="text-gray-800">Select Branch</option>
                {branches.map(b => (
                  <option key={b} value={b} className="text-gray-800">{b}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Batch Year */}
          <div>
            <label className="block text-blue-100 mb-2 text-sm font-medium">Batch Year (Passing Year)</label>
            <input
              type="number"
              name="passing_year"
              value={formData.passing_year}
              onChange={handleChange}
              placeholder="e.g. 2025"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-blue-100 mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Must contain 1 letter, 3 numbers and @"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
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

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-blue-200 mt-8">
          Already have an account?{" "}
          <Link to="/" className="text-white font-medium hover:text-blue-300 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

